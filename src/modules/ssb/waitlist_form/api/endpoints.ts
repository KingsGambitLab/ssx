import { API_BASE_URL } from "@utils/common/url";

export const ENDPOINTS = {
  SIGN_UP: `${API_BASE_URL}/users/v2/`,
  VERIFY_OTP: `${API_BASE_URL}/users/v2/verify/`,
  RETRY_OTP: `${API_BASE_URL}/api/v3/auth/retry/`,
  GET_WAITLIST_FORMS: `${API_BASE_URL}/api/v3/interviewbit_form_groups/?search_by=label&label[]=ssb_waitlist_form_student_IN`,
  SUBMIT_WAITLIST: `${API_BASE_URL}/api/v3/programs/school_of_business/forms/respond`,
  CREATE_PROGRAM_APPLICANT: `${API_BASE_URL}/api/v3/programs/school_of_business/program_applicants`,
};
