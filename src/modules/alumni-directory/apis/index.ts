import CaseUtil from "@/libs/caseUtil";

import { apiRequest, HttpMethods } from "@/utils/apiHelper";
import { ENDPOINTS } from './endPoints';
import {
  FilterOptionsResponse,
  AllAlumniResponse,
  AlumniDataResponse,
  AlumniFilters
} from '../types';
import { formatGetAllAlumniParams } from "../utils";

export const getFilterOptions = async (): Promise<FilterOptionsResponse> => {
  try {
    const response = await apiRequest<FilterOptionsResponse>(
      HttpMethods.GET,
      ENDPOINTS.FILTER_OPTIONS
    );

    const formatted = CaseUtil.toCase('camelCase', response) as FilterOptionsResponse;

    return formatted;
  } catch (error) {
    console.error(" getFilterOptions error:", error);
    throw error;
  }
};

export const getAllAlumni = async (pageNumber: number, filters: AlumniFilters): Promise<AllAlumniResponse> => {
  try {
    const params = formatGetAllAlumniParams(pageNumber, filters);

    const response = await apiRequest<AllAlumniResponse>(
      HttpMethods.POST,
      ENDPOINTS.ALL_ALUMNI,
      {
        ...params
      }
    );

    const formatted = CaseUtil.toCase('camelCase', response) as AllAlumniResponse;

    return formatted;
  } catch (error) {
    console.error(" getAllAlumni error:", error);
    throw error;
  }
};

export const getAlumniData = async (id: string): Promise<AlumniDataResponse> => {
  try {
    const response = await apiRequest<AlumniDataResponse>(
      HttpMethods.GET,
      `${ENDPOINTS.ALL_ALUMNI}/${id}`,
    );

    const formatted = CaseUtil.toCase('camelCase', response) as AlumniDataResponse;

    return formatted;
  } catch (error) {
    console.error(" getAlumniData error:", error);
    throw error;
  }
};
