const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.scaler.com';

export const ENDPOINTS = {
  FILTER_OPTIONS: `${API_BASE_URL}/programs/alum-directory/filters-options/`,
  ALL_ALUMNI: `${API_BASE_URL}/programs/alum-directory/`
}