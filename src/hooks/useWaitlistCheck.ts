"use client"

import { useState, useEffect, useCallback } from 'react';
import { useWaitlistApi } from '@modules/sst/waitlist/api';
import useUser from '@hooks/useUser';
import { WaitlistApiResponse, WaitlistForm, WaitlistFormField, WaitlistFormGroup } from '@modules/sst/waitlist/types';

export const useWaitlistCheck = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [formFields, setFormFields] = useState<WaitlistFormField[]>([]);
  const [allForms, setAllForms] = useState<{
    student: WaitlistFormField[];
    parent: WaitlistFormField[];
  }>({ student: [], parent: [] });
  
  const { data: userData } = useUser();
  const { getWaitlistForms, createProgramApplicant } = useWaitlistApi();

  const processFormGroup = (group: WaitlistFormGroup, response: WaitlistApiResponse) => {
    const sectionIds = group.relationships.interviewbit_form_sections.data.map(s => s.id);
    const sections = response.included.filter(item => 
      sectionIds.includes(item.id) && 
      item.type === 'interviewbit_form_section'
    );
    const formIds = sections.flatMap(section => 
      section.relationships?.interviewbit_forms?.data?.map(f => f.id) || []
    );
    return response.included
      .filter(item => 
        formIds.includes(item.id) && 
        item.type === 'interviewbit_form'
      )
      .sort((a, b) => a.attributes.order - b.attributes.order) as WaitlistForm[];
  };

  // Memoize category change handler
  const handleCategoryChange = useCallback((newCategory: string) => {
    if (!newCategory) return;
    const forms = newCategory.toLowerCase().includes('parent') ? 
      allForms.parent : 
      allForms.student;
    setFormFields(forms);
  }, [allForms]);

  // Create program applicant first when user is logged in
  useEffect(() => {
    const initProgramApplicant = async () => {
      if (userData?.isloggedIn) {
        try {
          await createProgramApplicant();
        } catch (error) {
          console.error('Error creating program applicant:', error);
        }
      }
    };

    initProgramApplicant();
  }, [userData?.isloggedIn]);

  // Check if any form group is completed
  const checkFormGroupCompletion = (response: WaitlistApiResponse) => {
    const studentGroup = response.data.find((g: WaitlistFormGroup) => g.attributes.label.includes('student'));
    const parentGroup = response.data.find((g: WaitlistFormGroup) => g.attributes.label.includes('parent'));

    if (!studentGroup || !parentGroup) return false;

    const studentForms = processFormGroup(studentGroup, response);
    const parentForms = processFormGroup(parentGroup, response);

    const isStudentComplete = studentForms.every((form: WaitlistForm) => form.attributes.response !== null);
    const isParentComplete = parentForms.every((form: WaitlistForm) => form.attributes.response !== null);

    return isStudentComplete || isParentComplete;
  };

  // Remove the separate effect for form updates
  // Keep only the initial form fetch effect
  useEffect(() => {
    const checkWaitlist = async () => {
      if (userData?.isloggedIn) {
        try {
          const response = await getWaitlistForms();
          
          if (checkFormGroupCompletion(response)) {
            return;
          }

          const studentGroup = response.data.find((g: WaitlistFormGroup) => g.attributes.label.includes('student'));
          const parentGroup = response.data.find((g: WaitlistFormGroup) => g.attributes.label.includes('parent'));
          
          if (!studentGroup || !parentGroup) return;

          const studentForms = processFormGroup(studentGroup, response)
            .map(form => transformForm(form, studentGroup.attributes.label));
          const parentForms = processFormGroup(parentGroup, response)
            .map(form => transformForm(form, parentGroup.attributes.label));

          setAllForms({
            student: studentForms,
            parent: parentForms
          });
          setFormFields(studentForms);
          
          // Only set showWaitlistModal to true if it's not already true
          if (!showWaitlistModal) {
            setShowWaitlistModal(true);
          }
        } catch (error) {
          console.error('Error fetching waitlist forms:', error);
        }
      }
    };

    checkWaitlist();
  }, [userData?.isloggedIn, showWaitlistModal]);

  return { 
    showWaitlistModal, 
    formFields, 
    setShowWaitlistModal,
    handleCategoryChange, // Return the memoized handler instead
  };
};

const transformForm = (form: WaitlistForm, formGroup: string): WaitlistFormField => {
  if (form.attributes.title === 'Category') {
    return {
      id: form.id,
      type: 'radio',
      label: form.attributes.description,
      required: form.attributes.required,
      formGroup,
      options: [
        { label: 'Student', value: 'Student' },
        { label: 'Parent / Family', value: 'Parent / Family' }
      ]
    };
  }

  return {
    id: form.id,
    type: form.attributes.form_type === 'dropdown' ? 'select' : 
          form.attributes.form_type === 'radio' ? 'radio' : 'text',
    label: form.attributes.description,
    placeholder: form.attributes.title,
    formGroup,
    options: form.attributes.meta?.options?.map(opt => ({
      label: opt.title,
      value: form.attributes.form_type === 'dropdown' ? opt.title : opt.value.toString()
    })),
    required: form.attributes.required
  };
}; 