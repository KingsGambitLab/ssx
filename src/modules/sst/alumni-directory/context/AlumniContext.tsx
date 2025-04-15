'use client';

import useSWR from 'swr';

import {
  createContext,
  useCallback,
  useState,
  ReactNode,
  use,
} from 'react';

import { getAllAlumni, getFilterOptions } from '@modules/sst/alumni-directory/api';
import { DEFAULT_ALUMNI_FILTERS } from '@modules/sst/alumni-directory/constants';
import { ENDPOINTS } from '@modules/sst/alumni-directory/api/endpoints';

import {
  AllAlumniData,
  AllAlumniResponse,
  FilterOptionsResponse,
  AlumniFilters,
} from '@modules/sst/alumni-directory/types';

interface AlumniContextType {
  filters: AlumniFilters;
  setFilters: (filters: AlumniFilters) => void;
  alumniList: AllAlumniData[];
  isAlumniListLoading: boolean;
  isAlumniListError: boolean;
  fetchAllAlumni: (object: { pageNumber: number, filterParams?: AlumniFilters }) => void;
  onFilterChange: (filters: AlumniFilters) => void;
  loadMore: () => void;
  quickFilters: string[];
  advancedFilters: Record<string, string[]>;
  isFilterLoading: boolean;
  isFilterError: boolean;
  showFilterLoader: boolean;
  alumniListTotalEntries: number | undefined;
}

export const AlumniContext = createContext<AlumniContextType | undefined>(undefined);

export function AlumniProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<AlumniFilters>(DEFAULT_ALUMNI_FILTERS);
  const [alumniList, setAlumniList] = useState<AllAlumniData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isAlumniListLoading, setIsAlumniListLoading] = useState(false);
  const [isAlumniListError, setIsAlumniListError] = useState(false);
  const [alumniListTotalEntries, setAlumniListTotalEntries] = useState<number | undefined>(undefined);
  const [showFilterLoader, setShowFilterLoader] = useState(false);

  const { data, error: isFilterError, isLoading: isFilterLoading } = useSWR<FilterOptionsResponse>(
    ENDPOINTS.FILTER_OPTIONS,
    getFilterOptions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const fetchAllAlumni = useCallback(async (
    { pageNumber, filterParams = filters }
      : { pageNumber: number, filterParams?: AlumniFilters }
  ) => {
    setPageNumber(pageNumber);
    setIsAlumniListLoading(true);
    try {
      const response: AllAlumniResponse = await getAllAlumni(pageNumber, filterParams);
      const newAlumni = response?.data;

      setAlumniList((prev) =>
        pageNumber === 1 ? newAlumni : [...prev, ...newAlumni]
      );

      setAlumniListTotalEntries(response?.totalEntries ?? 0);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsAlumniListError(true);
    } finally {
      setShowFilterLoader(false);
      setIsAlumniListLoading(false);
    }
  }, [filters]);


  const onFilterChange = useCallback((newFilters: AlumniFilters) => {
    const updatedFilters = { ...filters, ...newFilters };

    setFilters(updatedFilters);
    setPageNumber(1);
    fetchAllAlumni({ pageNumber: 1, filterParams: updatedFilters });
    setShowFilterLoader(true);
  }, [fetchAllAlumni, filters]);


  const loadMore = useCallback(() => {
    fetchAllAlumni({ pageNumber: pageNumber + 1 });
    setPageNumber(pageNumber + 1);
  }, [pageNumber, fetchAllAlumni]);


  const value: AlumniContextType = {
    filters,
    setFilters,
    alumniList,
    isAlumniListLoading,
    isAlumniListError,
    onFilterChange,
    fetchAllAlumni,
    loadMore,
    quickFilters: data?.quickFilters ?? [],
    advancedFilters: data?.advancedFilters ?? {},
    isFilterLoading,
    isFilterError,
    showFilterLoader,
    alumniListTotalEntries,
  };
  return (
    <AlumniContext.Provider value={value} >
      {children}
    </AlumniContext.Provider>
  );
}

export function useAlumniList() {
  const context = use(AlumniContext);
  if (context === undefined) {
    throw new Error('useAlumniList must be used within an AlumniProvider');
  }
  return context;
}
