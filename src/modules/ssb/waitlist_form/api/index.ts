/* eslint-disable @typescript-eslint/no-explicit-any */

import CaseUtil from "@lib/caseUtil";
import { ENDPOINTS } from "./endpoints";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";
import { useApi } from "@hooks/useApi";
import { WaitlistApiResponse } from "../types";

export const getOtp = async (
  email: string,
  phoneNumber: string,
  countryCode: string,
  consent: boolean,
  turnstileResponse: string
): Promise<any> => {
  const response = await apiRequest<any>(
    HttpMethods.POST,
    `${ENDPOINTS.SIGN_UP}`,
    {
      user: {
        email,
        phone_number: `${countryCode}-${phoneNumber}`,
        whatsapp_consent: consent
          ? "whatsapp_consent_yes"
          : "whatsapp_consent_no",
        country_code: countryCode,
        skip_existing_user_check: true,
        terms_consent: "true",
      },
      "cf-turnstile-response": turnstileResponse,
      recaptcha_action: "SIGN_UP",
      type: "school_of_business",
    }
  );

  return response;
};

interface VerifyOtpResponse {
  userId: number;
  email: string;
  newUser: boolean;
  phoneNumber: string;
  whatsappConsent: string;
  analyticsIdentifier: string;
}

export const verifyOtp = async (
  email: string,
  phoneNumber: string,
  otp: string
): Promise<VerifyOtpResponse> => {
  const formattedPhoneNumber = phoneNumber.includes("-")
    ? phoneNumber
    : `+91-${phoneNumber}`;

  const response = await apiRequest<any>(
    HttpMethods.POST,
    `${ENDPOINTS.VERIFY_OTP}`,
    {
      user: {
        email,
        otp,
        phone_number: formattedPhoneNumber,
        skip_existing_user_check: true,
      },
      type: "school_of_business",
      attributions: {
        intent: "otp_verified",
        product: "scaler",
        sub_product: "mba",
        element: "otp_modal",
        program: "school_of_business",
      },
    }
  );

  const formatted = CaseUtil.toCase("camelCase", response) as VerifyOtpResponse;

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

  return {
    getWaitlistForms,
  };
};
