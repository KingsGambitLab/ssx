'use client';

import { useAlumniList } from '@/hooks/useAlumniList';
import SearchBar from '../../components/SearchBar/SearchBar';
import QuickFilters from '../../components/QuickFilters/QuickFilters';

import styles from './Filters.module.scss';

export default function Filters() {

  const {
    isFilterError,
    isFilterLoading
  } = useAlumniList();

  if (isFilterLoading) return <p>Loading...</p>;
  if (isFilterError) return <p>Error...</p>;


  return (
    <div className={styles.flexContainer}>
      <SearchBar />
      <QuickFilters />
    </div>
  )
}