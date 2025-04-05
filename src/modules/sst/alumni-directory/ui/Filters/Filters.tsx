'use client';

import SearchBar from '@modules/sst/alumni-directory/components/SearchBar/SearchBar';
import QuickFilters from '@modules/sst/alumni-directory/components/QuickFilters';

import styles from './Filters.module.scss';

export default function Filters() {
  return (
    <div className={styles.flexContainer}>
      <SearchBar />
      <QuickFilters />
    </div>
  )
}