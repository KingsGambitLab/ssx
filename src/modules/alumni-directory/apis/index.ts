import CaseUtil from "@/libs/caseUtil";
import { apiRequest, HttpMethods } from "@/utils/apiHelper";
import {
  FilterOptionsResponse,
  AllAlumniResponse,
  AlumniDataResponse,
  AlumniFilters
} from '../types';
import { ENDPOINTS } from './endPoints';

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
  console.log("getAllAlumni", filters.quick);
  try {
    const params: Record<string, unknown> = {
      program_slug: 'school_of_tech',
      page_number: pageNumber,
    };

    // Add quick_filters only if it has items
    if (filters?.quick?.length > 0) {
      params.quick_filters = filters.quick;
    }

    // Add search if it exists
    if (filters?.search) {
      params.search = filters.search;
    }

    const advancedFilters: Record<string, string[]> = {};

    if (filters?.advanced?.city?.length > 0) {
      advancedFilters.city = filters.advanced.city;
    }

    if (filters?.advanced?.state?.length > 0) {
      advancedFilters.state = filters.advanced.state;
    }

    if (filters?.advanced?.batchYear?.length > 0) {
      advancedFilters.batch_year = filters.advanced.batchYear;
    }

    if (filters?.advanced?.clubs?.length > 0) {
      advancedFilters.clubs = filters.advanced.clubs;
    }

    if (Object.keys(advancedFilters).length > 0) {
      // Convert the advancedFilters object to a stringified JSON
      params.advanced_filters = advancedFilters;
    }

    console.log("params", params);
    const response = await apiRequest<AllAlumniResponse>(
      HttpMethods.POST,
      ENDPOINTS.ALL_ALUMNI,
      {
        ...params
      }
    );

    console.log("response", response);

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
