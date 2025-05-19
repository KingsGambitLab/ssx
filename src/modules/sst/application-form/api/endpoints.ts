import { API_BASE_URL } from '@utils/common/url';

export const ENDPOINTS = {
  SIGN_UP: `${API_BASE_URL}/users/v2/`,
  VERIFY_OTP: `${API_BASE_URL}/users/v2/verify/`,
  STUDENT_DETAILS_FORM: `${API_BASE_URL}/api/v3/interviewbit_form_groups/?search_by=label&label[]=application_form_student_details`,
  APPLICATION_FORM_DATA: `${API_BASE_URL}/api/v3/programs/school_of_tech/application_form/`,
  SUBMIT_FORM_RESPONSE: `${API_BASE_URL}/api/v3/programs/school_of_tech/application_form/submit/`
}