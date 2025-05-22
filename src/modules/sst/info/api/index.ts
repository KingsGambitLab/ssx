import CaseUtil from "@lib/caseUtil";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";

import { ENDPOINTS } from './endpoints';
import { UpcomingIntakeDetailsData, UpcomingIntakeDetailsResponse } from '../types';

export const getUpcomingIntakeDetailsData = async (): Promise<UpcomingIntakeDetailsData> => {
  const response = await apiRequest<UpcomingIntakeDetailsResponse>(
    HttpMethods.GET,
    ENDPOINTS.UPCOMING_INTAKE_DETAILS,
  );

  const formatted = CaseUtil.toCase('camelCase', response) as UpcomingIntakeDetailsData;

  return formatted;
};
