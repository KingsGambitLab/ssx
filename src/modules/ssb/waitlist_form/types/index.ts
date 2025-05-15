export interface LoginFormData {
  email: string;
  phone_number: string;
  whatsapp_consent: boolean;
  country_code: string;
}
export interface OtpFormData {
  otp: string;
}
export interface PersonalFormData {
  name: string;
  graduationYear: string;
  employer: string;
}
export type FormStep = "LOGIN" | "OTP" | "PERSONAL_DETAILS";
