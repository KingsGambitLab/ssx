export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  initialStep?: LoginStep;
  setCurrentCategory: (category: string) => void;
}

export interface LoginFormData {
  email: string;
  phone_number: string;
  whatsapp_consent: boolean;
  country_code: string;
}

export interface OTPFormData {
  otp: string;
}
// Add these interfaces
export interface WaitlistFormField {
  id: string;
  type: 'text' | 'select' | 'radio';
  label: string;
  placeholder?: string;
  formGroup: string;
  options?: Array<{
    label: string;
    value: string;
  }>;
  required: boolean;
}

export interface WaitlistFormData {
  [key: string]: string;
}

export type LoginStep = 'LOGIN' | 'OTP' | 'WAITLIST';

export interface WaitlistFormGroup {
  id: string;
  type: string;
  attributes: {
    id: number;
    label: string;
  };
  relationships: {
    interviewbit_form_sections: {
      data: Array<{
        id: string;
        type: string;
      }>;
    };
  };
}

export interface WaitlistForm {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    description: string;
    form_type: 'text' | 'email' | 'tel' | 'radio' | 'dropdown';
    order: number;
    required: boolean;
    meta?: {
      options?: Array<{
        value: number;
        title: string;
      }>;
    };
    response: string | null;
  };
  relationships?: {
    interviewbit_forms?: {
      data: Array<{
        id: string;
        type: string;
      }>;
    };
  };
}

export interface WaitlistApiResponse {
  data: WaitlistFormGroup[];
  included: Array<WaitlistForm>;
} 

export type TrackingProps = {
  clickType: string;
  clickText?: string;
  clickSource?: string;
  custom?: object;
  formType?: string;
};
