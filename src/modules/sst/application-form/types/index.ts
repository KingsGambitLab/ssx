/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FieldErrors,
  UseFormSetError,
  UseFormHandleSubmit
} from "react-hook-form";


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
  onOtpVerificationError: (error: string) => void;
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

export type ApplicationFormStep = 'phone-email' | 'otp' | 'waitlist';

export type VerifyOtpResponse = {
  userId: number;
  email: string;
  newUser: boolean;
  phoneNumber: string;
  whatsappConsent: string;
  analyticsIdentifier: string;
}
