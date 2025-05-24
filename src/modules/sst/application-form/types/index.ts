/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FieldErrors,
  UseFormSetError,
  UseFormHandleSubmit
} from "react-hook-form";

// have to check this once
export type WaitlistFormField = {
  id: string;
  formType: 'text' | 'select' | 'radio';
  title: string;
  description?: string;
  meta?: object;
  required: boolean;
}

export type FormGroup = {
  id: string;
  type: string;
  attributes: {
    id: number;
    label: string;
  };
  relationships: {
    interviewbitFormSections: {
      data: Array<{
        id: string;
        type: string;
      }>;
    };
  };
}

export type FormFields = {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    description: string;
    formType: 'text' | 'email' | 'tel' | 'radio' | 'dropdown' | 'date_time';
    order: number;
    required: boolean;   
    meta?: {
      width?: string;
      placeholder?: string;
      options?: Array<{
        value: number;
        title: string;
      }>;
    };
  };
  relationships?: {
    interviewbitForms?: {
      data: Array<{
        id: string;
        type: string;
      }>;
    };
  };
}

export type FormattedFormFields = {
  id: string;
  title: string;
  type: string;
  label: string;
  placeholder?: string;
  width?: string;
  options?: Array<{
    label: string;
    value: string;
  }>;
  required: boolean;
}

export type PhoneEmailStepFormData = {
  email: string;
  phone_number: string;
  whatsapp_consent: boolean;
  country_code: string;
}

export type OtpStepFormData = {
  otp: string;
  email: string;
}

export type PhoneEmailStepProps = {
  onSubmit: (data: PhoneEmailStepFormData) => void;
  errors: FieldErrors<PhoneEmailStepFormData>;
  setError: UseFormSetError<PhoneEmailStepFormData>;
  handleSubmit: UseFormHandleSubmit<PhoneEmailStepFormData>;
  control: any;
}

export type OtpStepProps = {
  email: string;
  onOtpVerificationSuccess: () => void;
  errors: FieldErrors<OtpStepFormData>;
  handleSubmit: UseFormHandleSubmit<OtpStepFormData>;
  control: any;
  phoneNumber: string;
  setStep: (step: ApplicationFormStep) => void;
}

export type getOtpProps = {
  email: string;
  phoneNumber: string;
  countryCode: string;
  consent: boolean;
  turnstileResponse: string;
}

export type WaitlistStepProps = {
  onSubmitSuccess: () => void;
  errors: FieldErrors<WaitlistStepFormData>;
  handleSubmit: UseFormHandleSubmit<WaitlistStepFormData>;
  control: any;
}

export type ApplicationFeesStepProps = {
  userDetails: Array<{
    label: string;
    value: string;
  }>;
}

export type PaymentInitialProps = {
  userDetails: Array<{
    label: string;
    value: string;
  }>;
}

export type PaymentFailureProps = {
  userDetails: Array<{
    label: string;
    value: string;
  }>;
  tryAgainHandler: () => void;
}

export type ApplicationFormStep = 'phone-email' | 'otp' | 'waitlist-form' | 'application-fees' | undefined;

export type VerifyOtpResponse = {
  userId: number;
  email: string;
  newUser: boolean;
  phoneNumber: string;
  whatsappConsent: string;
  analyticsIdentifier: string;
}

// have  to chekc this once
export type ApplicationFormDataResponse = {
  waitlistFormStudent: WaitlistFormField[];
  waitlistFormSubmitted: boolean;
  applicantEligibile: boolean;
}

// todo: have to replace this with student details form data
export type WaitlistStepFormData = {
  [key: string]: string | boolean;
  force_update: boolean;
}

export type StudentPersonalDetailsFormResponse = {
  data: FormGroup[];
  included: FormFields[];
}

