'use client';

import { useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import AdvancedFilters from '@modules/sst/alumni-directory/components/AdvancedFilters';
import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import { pageTrackingEvents, pageTrackingSources, trackEvent } from '@modules/sst/alumni-directory/utils';

import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const { onFilterChange, filters } = useAlumniList();

  const handleSearch = () => {
    trackEvent.click({
      clickType: pageTrackingEvents.filterApplied,
      clickText: pageTrackingEvents.searchFilter,
      clickSource: pageTrackingSources.searchBar,
      custom: {
        filter_value: searchValue,
        filter_type: "search",
      },
    });
    onFilterChange({ ...filters, search: searchValue });
  };

  useEffect(() => {
    setSearchValue(filters?.search || '');
  }, [filters]);

  return (
    <div className={styles.mainContainer}>
      <AdvancedFilters />
      <Input
        size="large"
        placeholder="Search by name, city, state or school"
        variant="filled"
        value={searchValue}
        className={styles.searchBarInput}
        onPressEnter={handleSearch}
        onChange={(e) => setSearchValue(e.target.value)}
        suffix={<SearchOutlined onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />}
      />
    </div>
  );
}