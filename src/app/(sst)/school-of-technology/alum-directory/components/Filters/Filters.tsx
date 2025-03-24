'use client';

import useSWR from 'swr';

// import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import QuickFilters from "./QuickFilters/QuickFilters";
import { getFilterOptions } from '@/common/apis';

export default function Filters() {
  // const [filters, setFilters] = useState<string[]>([]);

  const { data, error } = useSWR('/api/alum-directory/filters-options', getFilterOptions);

  console.log(process.env.NODE_ENV);
  console.log("data", data)
  console.log("error", error)


  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SearchBar />
      <QuickFilters filters={data?.data?.quick_filters} />
    </div>
  )
}