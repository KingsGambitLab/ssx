/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CaseUtil from "@lib/caseUtil";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";
import { ENDPOINTS } from "@modules/sst/application-form/api/endpoints";
import { useApi } from "@hooks/useApi";
import {
  getOtpProps,
  VerifyOtpResponse,
  ApplicationFormDataResponse,
  StudentPersonalDetailsFormResponse,
} from "@modules/sst/application-form/types";

import { APPLICATION_FORM_STUDENT_DETAIL_LABEL } from '../utils/constants';

export const getOtp = async ({email, phoneNumber, countryCode, consent, turnstileResponse}: getOtpProps) => {
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

export const verifyOtp = async (email: string, phoneNumber: string, otp: string) => { 
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
  )

  const formatted = CaseUtil.toCase('camelCase', response) as VerifyOtpResponse;

  return formatted;
}

export const applicationFormData = async () => {
  const response = await apiRequest<any>(
    HttpMethods.GET,
    `${ENDPOINTS.APPLICATION_FORM_DATA}`,
    {
      slug: 'school_of_tech',
    }
  )
  
  const formatted = CaseUtil.toCase('camelCase', response) as ApplicationFormDataResponse;

  return formatted;
}

export const useApplicationFormApi = () => {
  const { request } = useApi();

  const getApplicationFormData = async () => {
    const response = await request<any>(
      HttpMethods.GET,
      `${ENDPOINTS.APPLICATION_FORM_DATA}`,
      {
        slug: 'school_of_tech',
      }
    );
    
    const formatted = CaseUtil.toCase('camelCase', response) as ApplicationFormDataResponse;
    return formatted;
  };

  const getStudentPersonalDetailsForm = async () => {
    const response = await request<any>(
      HttpMethods.GET,
      `${ENDPOINTS.STUDENT_DETAILS_FORM}`,
    );
    
    const formatted = CaseUtil.toCase('camelCase', response) as StudentPersonalDetailsFormResponse;
    return formatted;
  };

  const submitPersonalDetailsFormResponse = async (data: any) => {
    const { force_update, ...rest } = data;
    
    const response = await request<any>(
      HttpMethods.PUT,
      `${ENDPOINTS.SUBMIT_STUDENT_DETAILS_FORM_RESPONSE}`,
      {
        slug: 'school_of_tech',
        form_group_label: APPLICATION_FORM_STUDENT_DETAIL_LABEL,
        form_responses: {
          ...rest
        },
        options: {
          force_update: force_update,
        },
        api_context: {
          type: "workflowStepDefinition",
          id: "198"
        },
        auto_save: false,
      }
    );

    return response;
  };

  return {
    getApplicationFormData,
    getStudentPersonalDetailsForm,
    submitPersonalDetailsFormResponse
  };
};
