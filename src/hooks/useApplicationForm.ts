"use client"

import { useEffect, useState } from "react"

import useUser from "@hooks/useUser"

import {
  useApplicationFormApi
} from "@modules/sst/application-form/api"

import {
  ApplicationFormDataResponse,
  FormFields,
  FormattedFormFields,
  StudentPersonalDetailsFormResponse
} from "@modules/sst/application-form/types"

export const useApplicationForm = () => { 
  const { data: userData } = useUser();
  const { getApplicationFormData, getStudentPersonalDetailsForm } = useApplicationFormApi();
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [studentPersonalDetailsForm, setStudentPersonalDetailsForm] = useState<FormattedFormFields[]>([]);

  const processApplicationFormData = (response: ApplicationFormDataResponse) => {
    if (!response.waitlistFormSubmitted) {
      setShowWaitlistForm(true);
    }
  }

  const processFormGroup = (response: StudentPersonalDetailsFormResponse) => { 
    const sectionIds = response.data.flatMap(s => s.relationships.interviewbitFormSections.data.map(s => s.id));

    const sections = response.included.filter(item => 
      sectionIds.includes(item.id) && 
      item.type === 'interviewbit_form_section'
    );

    const formIds = sections.flatMap(section => 
      section.relationships?.interviewbitForms?.data?.map(f => f.id) || []
    );

    return response.included
      .filter(item => 
        formIds.includes(item.id) && 
        item.type === 'interviewbit_form'
      )
      .sort((a, b) => a.attributes.order - b.attributes.order) as FormFields[];
  }

  const formatFormFields = (formFields: FormFields[]) => {
    return formFields.map(formField => ({
      id: formField.id,
      title: formField.attributes.title,
      type: formField.attributes.formType === 'dropdown' ? 'select' :
        formField.attributes.formType === 'date_time' ? 'date' : 'text',
      label: formField.attributes.description,
      placeholder: formField.attributes?.meta?.placeholder,
      width: formField.attributes?.meta?.width,
      options: formField.attributes.meta?.options?.map(opt => ({
        label: opt.title,
        value: formField.attributes.formType === 'dropdown' ? opt.title : opt.value.toString()
      })),
      required: formField.attributes.required
    }));
  }

  const processStudentPersonalDetailsForm = (response: StudentPersonalDetailsFormResponse) => {
    if (response?.data?.length === 0 || response?.included?.length === 0) return;

    const formFields = processFormGroup(response);
    const formattedFormFields = formatFormFields(formFields);

    setStudentPersonalDetailsForm(formattedFormFields);
  }

  // This will Fetch info about whether user has submitted waitlist form or not
  useEffect(() => {
    const fetchApplicationFormData = async () => {
      if(userData?.isloggedIn) {
        try {
          const response = await getApplicationFormData();
          console.log("response", response);
          if (response !== undefined && response !== null) {
            processApplicationFormData(response);
          }
        } catch (error) {
          console.error('Error creating program applicant:', error);
        }
      }
    }

    fetchApplicationFormData();
  }, [userData?.isloggedIn])


  // If the user has not submitted waitlist form,
  // then student personal details form will be fetched
  useEffect(() => {
    // if (!showWaitlistForm || !userData?.isloggedIn) return;

    const fetchStudentPersonalDetailsForm = async () => {
      const response = await getStudentPersonalDetailsForm();
      if (response !== undefined && response !== null) {
        processStudentPersonalDetailsForm(response);
      }
    }

    fetchStudentPersonalDetailsForm();
  }, [showWaitlistForm, userData?.isloggedIn])

  return {
    showWaitlistForm,
    studentPersonalDetailsForm
  }
}