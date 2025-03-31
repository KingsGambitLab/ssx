'use client';

import SearchBar from '../../components/SearchBar/SearchBar';
import QuickFilters from '../../components/QuickFilters/QuickFilters';
import { AdvancedFilters, AlumniFilters } from '@/modules/alumni-directory/types';

import styles from './Filters.module.scss';

type FiltersProps = {
  quickFilters: string[];
  advancedFilters: AdvancedFilters;
  isFilterError: boolean;
  isFilterLoading: boolean;
  appliedFilters: object;
  onFilterChange: (filters: AlumniFilters) => void;
}

export default function Filters({
  appliedFilters,
  onFilterChange,
  quickFilters,
  advancedFilters,
  isFilterError,
  isFilterLoading
}: FiltersProps) {

  if (isFilterLoading) return <p>Loading...</p>;
  if (isFilterError) return <p>Error...</p>;

  const { state, city, batchYear, clubs } = advancedFilters ?? {};

  return (
    <div className={styles.flexContainer}>
      <SearchBar
        advancedFilters={{
          state: state ?? [],
          city: city ?? [],
          batchYear: batchYear ?? [],
          clubs: clubs ?? []
        }}
        appliedFilters={appliedFilters as AlumniFilters}
        onFilterChange={(filters: AlumniFilters) => onFilterChange(filters)}
      />
      <QuickFilters
        filterData={quickFilters ?? []}
        appliedFilters={appliedFilters as AlumniFilters}
        onFilterChange={(filters: AlumniFilters) => onFilterChange(filters)}
      />
    </div>
  )
}