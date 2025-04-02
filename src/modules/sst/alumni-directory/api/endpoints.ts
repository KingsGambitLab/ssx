const isProduction = process.env.NODE_ENV === 'production';

export const API_BASE_URL = isProduction
  ? `${process.env.NEXT_PUBLIC_BASE_URL}`
  : `${process.env.NEXT_PUBLIC_BASE_URL}/api/base_api`;

export const ENDPOINTS = {
  FILTER_OPTIONS: `${API_BASE_URL}/programs/alum-directory/filters-options/`,
  ALL_ALUMNI: `${API_BASE_URL}/programs/alum-directory/`
}