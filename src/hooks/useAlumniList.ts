'use client';

import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';


import { getAllAlumni, getFilterOptions } from '@/modules/alumni-directory/apis';
import { AllAlumniData, AllAlumniResponse, FilterOptionsResponse, AlumniFilters } from '@/modules/alumni-directory/types';
import { ENDPOINTS } from '@/modules/alumni-directory/apis/endPoints';
import { useAddFiltersToUrl } from '@/modules/alumni-directory/utils/useAddFiltersToUrl';

const initialFilters = {
  quick: [],
  advanced: {
    state: [],
    city: [],
    batchYear: [],
    clubs: []
  },
  search: ''
};

export function useAlumniList(defaultFilters = initialFilters) {
  const [filters, setFilters] = useState<AlumniFilters>(defaultFilters);
  const [alumniList, setAlumniList] = useState<AllAlumniData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [alumniListLoading, setAlumniListLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);

  const addFiltersToUrl = useAddFiltersToUrl();


  // Fetch filter options using SWR (only once)
  const { data, error: isFilterError, isLoading: isFilterLoading } = useSWR<FilterOptionsResponse>(
    ENDPOINTS.FILTER_OPTIONS,
    getFilterOptions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Fetch alumni data (paginated + filtered)
  useEffect(() => {
    const fetchData = async () => {
      if (!shouldFetch) return;

      setAlumniListLoading(true);
      try {
        const response: AllAlumniResponse = await getAllAlumni(pageNumber, filters);
        const newAlumni = response.data;

        setAlumniList((prev) =>
          pageNumber === 1 ? newAlumni : [...prev, ...newAlumni]
        );

        setShouldFetch(newAlumni.length > 0);
      } catch (err) {
        console.error('Failed to fetch alumni:', err);
      } finally {
        setAlumniListLoading(false);
      }
    };

    fetchData();
  }, [filters, pageNumber, shouldFetch]);

  // Handle filters update
  const onFilterChange = useCallback((newFilters: typeof filters) => {
    console.log('newFilters', newFilters);
    setFilters(newFilters);
    setPageNumber(1);
    setShouldFetch(true);
    addFiltersToUrl(newFilters);
  }, [addFiltersToUrl]);

  // Load next page for infinite scroll
  const loadMore = () => setPageNumber((prev) => prev + 1);

  return {
    filters,
    alumniList,
    alumniListLoading,
    shouldFetch,
    onFilterChange,
    loadMore,
    quickFilters: data?.quickFilters ?? [],
    advancedFilters: data?.advancedFilters ?? {},
    isFilterLoading,
    isFilterError
  };
}
