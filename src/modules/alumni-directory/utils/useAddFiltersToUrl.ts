'use client';

import { useRouter } from 'next/navigation';
import CaseUtil from '@/libs/caseUtil';
import { AlumniFilters } from '../types';

const convertToSnakeCase = (filter: string): string =>
  CaseUtil.toCase('snakeCase', filter) as string;

const addQuickFilters = (params: URLSearchParams, quick: AlumniFilters['quick']): void => {
  quick.forEach(filter => {
    params.append('quick_filters', convertToSnakeCase(filter));
  });
};

const addSearchFilter = (params: URLSearchParams, search: AlumniFilters['search']): void => {
  if (search) {
    params.set('search', search);
  }
};

const addAdvancedFilters = (params: URLSearchParams, advanced: AlumniFilters['advanced']): void => {
  Object.entries(advanced).forEach(([key, values]) => {
    if (values.length > 0) {
      const encodedKey = encodeURIComponent(key);
      const encodedValues = values.map(value => encodeURIComponent(value)).join(',');
      params.append('advanced_filters', `${encodedKey},${encodedValues}`);
    }
  });
};

export function useAddFiltersToUrl() {
  const router = useRouter();

  const addFiltersToUrl = (filters: AlumniFilters): void => {
    const params = new URLSearchParams();

    if (filters.quick?.length) {
      addQuickFilters(params, filters.quick);
    }

    if (filters.search) {
      addSearchFilter(params, filters.search);
    }

    if (filters.advanced) {
      addAdvancedFilters(params, filters.advanced);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return addFiltersToUrl;
}
