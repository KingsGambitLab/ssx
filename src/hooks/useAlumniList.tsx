'use client';

import useSWR from 'swr';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
  useEffect
} from 'react';


import { getAllAlumni, getFilterOptions } from '@/modules/alumni-directory/apis';
import { ENDPOINTS } from '@/modules/alumni-directory/apis/endPoints';
import { DEFAULT_ALUMNI_FILTERS } from '@/modules/alumni-directory/constants';
import {
  AllAlumniData,
  AllAlumniResponse,
  FilterOptionsResponse,
  AlumniFilters,
} from '@/modules/alumni-directory/types';

interface AlumniContextType {
  filters: AlumniFilters;
  setFilters: (filters: AlumniFilters) => void;
  alumniList: AllAlumniData[];
  isAlumniListLoading: boolean;
  isAlumniListError: boolean;
  fetchMoreData: boolean;
  onFilterChange: (filters: AlumniFilters) => void;
  loadMore: () => void;
  quickFilters: string[];
  advancedFilters: Record<string, string[]>;
  isFilterLoading: boolean;
  isFilterError: boolean;
  showFilterLoader: boolean;
}

const AlumniContext = createContext<AlumniContextType | undefined>(undefined);

export function AlumniProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<AlumniFilters>(DEFAULT_ALUMNI_FILTERS);
  const [alumniList, setAlumniList] = useState<AllAlumniData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isAlumniListLoading, setIsAlumniListLoading] = useState(false);
  const [isAlumniListError, setIsAlumniListError] = useState(false);
  const [fetchMoreData, setFetchMoreData] = useState(true);
  const [showFilterLoader, setShowFilterLoader] = useState(false);

  const { data, error: isFilterError, isLoading: isFilterLoading } = useSWR<FilterOptionsResponse>(
    ENDPOINTS.FILTER_OPTIONS,
    getFilterOptions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const fetchData = useCallback(async (
    { pageNumber, filterParams = filters, shouldFetch = fetchMoreData }
      : { pageNumber: number, filterParams?: AlumniFilters, shouldFetch?: boolean }
  ) => {
    if (!shouldFetch) return;

    setPageNumber(pageNumber);
    setIsAlumniListLoading(true);
    try {
      const response: AllAlumniResponse = await getAllAlumni(pageNumber, filterParams);
      const newAlumni = response.data;

      setAlumniList((prev) =>
        pageNumber === 1 ? newAlumni : [...prev, ...newAlumni]
      );

      setFetchMoreData(newAlumni.length > 0);
    } catch (err) {
      setIsAlumniListError(true);
      console.error('Failed to fetch alumni:', err);
    } finally {
      setShowFilterLoader(false);
      setIsAlumniListLoading(false);
    }
  }, [fetchMoreData, filters]);


  const onFilterChange = useCallback((newFilters: AlumniFilters) => {

    const updatedFilters = { ...filters, ...newFilters };

    console.log("newFilters", updatedFilters);
    setFilters(updatedFilters);
    setPageNumber(1);
    setFetchMoreData(true);
    fetchData({ pageNumber: 1, filterParams: updatedFilters, shouldFetch: true });
    setShowFilterLoader(true);
  }, [fetchData, filters]);


  const loadMore = useCallback(() => {
    if (fetchMoreData) fetchData({ pageNumber: pageNumber + 1 });
    setPageNumber(pageNumber + 1);
  }, [fetchMoreData, pageNumber, fetchData]);

  useEffect(() => {
    fetchData({ pageNumber: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const value: AlumniContextType = {
    filters,
    setFilters,
    alumniList,
    isAlumniListLoading,
    isAlumniListError,
    fetchMoreData,
    onFilterChange,
    loadMore,
    quickFilters: data?.quickFilters ?? [],
    advancedFilters: data?.advancedFilters ?? {},
    isFilterLoading,
    isFilterError,
    showFilterLoader,
  };
  return (
    <AlumniContext.Provider value={value} >
      {children}
    </AlumniContext.Provider>
  );
}

export function useAlumniList() {
  const context = useContext(AlumniContext);
  if (context === undefined) {
    throw new Error('useAlumniList must be used within an AlumniProvider');
  }
  return context;
}
