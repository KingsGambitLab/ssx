'use client';

import { Flex } from 'antd';

import Banner from "@/modules/alumni-directory/sections/Banner/Banner";
import Filters from "@/modules/alumni-directory/sections/Filters/Filters";
import AlumniList from "@/modules/alumni-directory/sections/AlumniList/AlumniList";


import styles from "./page.module.scss";
import { useAlumniList } from '@/hooks/useAlumniList';
import { AdvancedFilters, AlumniFilters } from '@/modules/alumni-directory/types';


export default function Page() {
  const {
    filters,
    alumniList,
    alumniListLoading,
    shouldFetch,
    onFilterChange,
    loadMore,
    quickFilters,
    advancedFilters,
    isFilterError,
    isFilterLoading,
  } = useAlumniList();

  console.log("quickFilters", quickFilters);

  return (
    <>
      <Flex vertical gap={16} align="start" className={styles.container}>
        <Banner />
        {/* Filters */}
        <Filters
          appliedFilters={filters}
          onFilterChange={(filters: AlumniFilters) => onFilterChange(filters)}
          quickFilters={quickFilters as string[]}
          advancedFilters={advancedFilters as AdvancedFilters}
          isFilterError={isFilterError}
          isFilterLoading={isFilterLoading}
        />
        {/* Alumni List */}
        <AlumniList
          alumniList={alumniList}
          loading={alumniListLoading}
          shouldFetch={shouldFetch}
          loadMore={loadMore}
        />
      </Flex>
    </>
  )
}