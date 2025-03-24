
import { ENDPOINTS } from '@/libs/endpoints';

const API_BASE_URL = process?.env?.NEXT_PUBLIC_BASE_URL || 'https://www.scaler.com';

export const getFilterOptions = async () => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FILTER_OPTIONS('school_of_tech')}`);
  const data = await response.json();
  return data;
}