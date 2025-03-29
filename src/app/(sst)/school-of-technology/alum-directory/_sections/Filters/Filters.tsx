'use client';

import useSWR from 'swr';

// import { useState, useEffect } from "react";
import SearchBar from "../../_components/SearchBar/SearchBar";
import QuickFilters from "../../_components/QuickFilters/QuickFilters";
import { getFilterOptions } from '@/common/apis';

import styles from './Filters.module.scss';

export default function Filters() {
  // const [filters, setFilters] = useState<string[]>([]);

  const { data, error } = useSWR('/api/alum-directory/filters-options', getFilterOptions);

  console.log(process.env.NODE_ENV);
  console.log("data", data)
  console.log("error", error)


  return (
    <div className={styles.flexContainer}>
      <SearchBar />
      {/* <QuickFilters filters={data?.data?.quick_filters} /> */}
      <QuickFilters filters={['UP', 'Karnataka', 'West Bengal', 'Batch 23', 'Batch 24']} />
    </div>
  )
}