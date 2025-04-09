import CaseUtil from "@lib/caseUtil";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";

import { ENDPOINTS } from './endpoints';
import {
  AllAlumniResponse,
  AlumniDataResponse,
  AlumniFilters,
  FilterOptionsResponse
} from '../types';
import { DEFAULT_ALUMNI_FILTERS } from "../constants";
import { formatGetAllAlumniParams } from "../utils";

export const getFilterOptions = async (): Promise<FilterOptionsResponse> => {
  const response = await apiRequest<FilterOptionsResponse>(
    HttpMethods.GET,
    ENDPOINTS.FILTER_OPTIONS
  );

  const formatted = CaseUtil.toCase('camelCase', response) as FilterOptionsResponse;

  return formatted;
};

export const getAllAlumni = async (
  pageNumber: number, filters: AlumniFilters = DEFAULT_ALUMNI_FILTERS
): Promise<AllAlumniResponse> => {
  const params = formatGetAllAlumniParams(pageNumber, filters);

  const response = await apiRequest<AllAlumniResponse>(
    HttpMethods.POST,
    ENDPOINTS.ALL_ALUMNI,
    params
  );

  const formatted = CaseUtil.toCase('camelCase', response) as AllAlumniResponse;

  return formatted;
};

export const getAlumniData = async (id: string): Promise<AlumniDataResponse> => {
  const response = await apiRequest<AlumniDataResponse>(
    HttpMethods.GET,
    `${ENDPOINTS.ALL_ALUMNI}${id}`,
  );

  const formatted = CaseUtil.toCase('camelCase', response) as AlumniDataResponse;

  return formatted;
};
