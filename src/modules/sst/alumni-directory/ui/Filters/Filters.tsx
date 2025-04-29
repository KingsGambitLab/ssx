'use client';

import SearchBar from '@modules/sst/alumni-directory/components/SearchBar/SearchBar';
import QuickFilters from '@modules/sst/alumni-directory/components/QuickFilters';
import Section from '@components/common/Section';

import styles from './Filters.module.scss';

export default function Filters() {
  return (
    <Section section_class='filters' id='filters'>
      <div className={styles.flexContainer}>
        <SearchBar />
        <QuickFilters />
      </div>
    </Section>
  )
}