import { API_BASE_URL } from "@utils/common/url";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";
import { CaseUtil } from "@lib";
import { useApi } from '@hooks/useApi';

const JWT_TOKEN = `${API_BASE_URL}/generate-jwt`;
const USER_DETAILS = `${API_BASE_URL}/api/v3/users`;
const LOGOUT = `${API_BASE_URL}/users/sign_out`;
const RETRY_OTP = `${API_BASE_URL}/api/v3/auth/retry`;

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  timezone: string;
  orgyear: number;
  phone_verified: boolean;
  roles: string[];
  avatar: string;
  email_verified: boolean;
  sign_up_method: string;
  timezone_abbreviation: string;
}

interface UserResponse {
  data: {
    id: string;
    type: string;
    attributes: UserAttributes;
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateJwt = async (): Promise<any> => {
  const response = await apiRequest<any>(
    HttpMethods.POST,
    JWT_TOKEN,
    {},
    { type: 'text' }
  );

  return response;
};

export const logout = async () => {
  const response = await apiRequest<any>(
    HttpMethods.DELETE,
    LOGOUT,
  );
  return response;
};

export const useUserApi = () => {
  const { request } = useApi();

  const getUserDetails = async () => {
    const response = await request<UserResponse>(
      HttpMethods.GET,
      USER_DETAILS
    );
    return CaseUtil.toCase('camelCase', response);
  }

  return {
    getUserDetails,
  };
};


export const retryOtp = async (
  identifier: string,
  otpChannel: 'whatsapp' | 'sms' | 'voice',
  turnstileToken: string
) => {
  const response = await apiRequest<any>(
    HttpMethods.POST,
    RETRY_OTP,
    {
      identifier,
      otp_channel: otpChannel,
      method: 'mobile',
      'cf-turnstile-response': turnstileToken,
    }
  );
  return response;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
