/* eslint-disable @typescript-eslint/no-explicit-any */

import CaseUtil from "@lib/caseUtil";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";
import { useApi } from '@hooks/useApi';

import { ENDPOINTS } from './endpoints';
import { WaitlistFormData, WaitlistApiResponse } from '@modules/sst/waitlist/types';

interface VerifyOtpResponse {
  userId: number;
  email: string;
  newUser: boolean;
  phoneNumber: string;
  whatsappConsent: string;
  analyticsIdentifier: string;
}

export const getOtp = async (email: string, phoneNumber: string, countryCode: string, consent: boolean, turnstileResponse: string): Promise<any> => {
  const response = await apiRequest<any>(
    HttpMethods.POST,
    `${ENDPOINTS.SIGN_UP}`,
    {
      user: {
        email,
        phone_number: `${countryCode}-${phoneNumber}`,
        whatsapp_consent: consent ? 'whatsapp_consent_yes' : 'whatsapp_consent_no',
        country_code: countryCode,
        skip_existing_user_check: true,
        terms_consent: 'true',
      },
      'cf-turnstile-response': turnstileResponse,
      recaptcha_action: 'SIGN_UP',
      type: 'school_of_tech',
    }
  );

  return response;
};

export const verifyOtp = async (email: string, phoneNumber: string, otp: string): Promise<VerifyOtpResponse> => {
  const response = await apiRequest<any>(
    HttpMethods.POST,
    `${ENDPOINTS.VERIFY_OTP}`,
    { 
      user: {
        email,
        otp,
        phone_number: phoneNumber,
        skip_existing_user_check: true,
      },
      type: 'school_of_tech',
      attributions: {
        intent: 'otp_verified',
        product: 'scaler',
        sub_product: 'undergrad',
        element: 'otp_modal',
        program: 'school_of_tech',
      },
    }
  );

  const formatted = CaseUtil.toCase('camelCase', response) as VerifyOtpResponse;

  return formatted;
};

export const useWaitlistApi = () => {
  const { request } = useApi();

  const getWaitlistForms = async () => {
    const response = await request<WaitlistApiResponse>(
      HttpMethods.GET,
      ENDPOINTS.GET_WAITLIST_FORMS
    );
    return response;
  };

  const createProgramApplicant = async () => {
    const response = await request<any>(
      HttpMethods.POST,
      ENDPOINTS.CREATE_PROGRAM_APPLICANT,
    );
    return response;
  };

  const submitWaitlistForm = async (data: WaitlistFormData) => {
    // Find the category value from the form responses
    const categoryFieldId = Object.keys(data).find(key => 
      data[key] === 'Student' || data[key] === 'Parent / Family'
    );
    const categoryValue = categoryFieldId ? data[categoryFieldId] : 'Student';

    // Determine form group label based on selected category
    const formGroupLabel = categoryValue === 'Student' ? 
      'sst_waitlist_form_student_IN' : 
      'sst_waitlist_form_parent_IN';

    const payload = {
      slug: 'school_of_tech',
      form_group_label: formGroupLabel,
      form_responses: data
    };

    const response = await request<any>(
      HttpMethods.PUT,
      ENDPOINTS.SUBMIT_WAITLIST,
      payload
    );
    return response;
  };

  return {
    getWaitlistForms,
    submitWaitlistForm,
    createProgramApplicant
  };
};