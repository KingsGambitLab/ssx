import { apiRequest, HttpMethods } from "@utils/common/apiHelper";
import { getOtpProps } from "@modules/sst/application-form/types";
import { ENDPOINTS } from "@modules/sst/application-form/api/endpoints";

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
