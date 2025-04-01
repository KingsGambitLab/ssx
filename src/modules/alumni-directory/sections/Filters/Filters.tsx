'use client';

import SearchBar from '../../components/SearchBar/SearchBar';
import QuickFilters from '../../components/QuickFilters/QuickFilters';

import styles from './Filters.module.scss';

export default function Filters() {

  return (
    <div className={styles.flexContainer}>
      <SearchBar />
      <QuickFilters />
    </div>
  )
}