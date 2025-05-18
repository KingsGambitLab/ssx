/* eslint-disable @typescript-eslint/no-explicit-any */

import { ENDPOINTS } from "@modules/sst/application-form/api/endpoints";
import { getOtpProps, VerifyOtpResponse } from "@modules/sst/application-form/types";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";
import CaseUtil from "@lib/caseUtil";

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
