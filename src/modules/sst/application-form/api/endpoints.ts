import { API_BASE_URL } from '@utils/common/url';

import { APPLICATION_FORM_STUDENT_DETAIL_LABEL } from '../utils/constants';

export const ENDPOINTS = {
  SIGN_UP: `${API_BASE_URL}/users/v2/`,
  VERIFY_OTP: `${API_BASE_URL}/users/v2/verify/`,
  STUDENT_DETAILS_FORM: `${API_BASE_URL}/api/v3/interviewbit_form_groups/?search_by=label&label[]=${APPLICATION_FORM_STUDENT_DETAIL_LABEL}`,
  APPLICATION_FORM_DATA: `${API_BASE_URL}/api/v3/programs/school_of_tech/application_form/`,
  SUBMIT_STUDENT_DETAILS_FORM_RESPONSE: `${API_BASE_URL}/api/v3/programs/school_of_tech/forms/respond`
}