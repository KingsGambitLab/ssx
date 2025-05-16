import {
  UseFormRegister,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
  UseFormHandleSubmit
} from "react-hook-form";


export type PhoneEmailStepFormData = {
  email: string;
  phone_number: string;
  whatsapp_consent: boolean;
  country_code: string;
}

export type PhoneEmailStepProps = {
  register: UseFormRegister<PhoneEmailStepFormData>;
  onSubmit: (data: PhoneEmailStepFormData) => void;
  errors: FieldErrors<PhoneEmailStepFormData>;
  setError: UseFormSetError<PhoneEmailStepFormData>;
  clearErrors: UseFormClearErrors<PhoneEmailStepFormData>;
  handleSubmit: UseFormHandleSubmit<PhoneEmailStepFormData>;
  control: any;
}

export type getOtpProps = {
  email: string;
  phoneNumber: string;
  countryCode: string;
  consent: boolean;
  turnstileResponse: string;
}