export enum LoginStep {
  PHONE_EMAIL = 'PHONE_EMAIL',
  OTP = 'OTP'
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export interface LoginFormData {
  phone_number: string;
  email: string;
  country_code: string;
}

export interface OTPFormData {
  otp: string;
} 
