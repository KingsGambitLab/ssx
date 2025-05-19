"use client"

import { useState, useEffect } from 'react';
import { useWaitlistApi } from '@modules/ssb/waitlist_form/api';
import useUser from '@hooks/useUser';
import { WaitlistFormField, WaitlistFormGroup, WaitlistApiResponse, WaitlistForm } from '@modules/ssb/waitlist_form/types';

export const useSsbWaitlistCheck = () => {
  const [formFields, setFormFields] = useState<WaitlistFormField[]>([]);
  const [allForms, setAllForms] = useState<{
    student: WaitlistFormField[];
  }>({ student: [] });

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

  // const checkFormGroupCompletion = (response: WaitlistApiResponse) => {
  //   const studentGroup = response.data.find((g: WaitlistFormGroup) => g.attributes.label.includes('student'));

  //   if (!studentGroup) return false;

  //   const studentForms = processFormGroup(studentGroup, response)
    
  //   const isStudentComplete = studentForms.every((form: WaitlistForm) => form.attributes.response !== null);

  //   return isStudentComplete;
  // }

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

  
  // Remove the separate effect for form updates
  // Keep only the initial form fetch effect
  useEffect(() => {
    const checkWaitlist = async () => {
      if (userData?.isloggedIn) {
        try {
          const response = await getWaitlistForms();

          // if (checkFormGroupCompletion(response)) {
          //   return;
          // }

          const studentGroup = response.data.find((g: WaitlistFormGroup) => g.attributes.label.includes('student'));

          if (!studentGroup) return;

          const studentForms = processFormGroup(studentGroup, response)
            .map(form => transformForm(form, studentGroup.attributes.label));

          setAllForms({
            student: studentForms,
          });
          setFormFields(studentForms);
        } catch (error) {
          console.error('Error fetching waitlist forms:', error);
        }
      }
    };

    checkWaitlist();
  }, [userData?.isloggedIn]);

  return {
    formFields,
    setFormFields,
    allForms,
    setAllForms,
  }
};

const transformForm = (form: WaitlistForm, formGroup: string): WaitlistFormField => {
  return {
    id: form.id,
    type: form.attributes.form_type === 'dropdown' ? 'select' : 
          form.attributes.form_type === 'radio' ? 'radio' : 'text',
    label: form.attributes.description,
    placeholder: form.attributes.title,
    formGroup,
    required: form.attributes.required,
    value: form.attributes.response || '',
    options: form.attributes.meta?.options?.map(opt => ({
      label: opt.title,
      value: form.attributes.form_type === 'dropdown' ? opt.title : opt.value.toString()
    })),
  }
};

