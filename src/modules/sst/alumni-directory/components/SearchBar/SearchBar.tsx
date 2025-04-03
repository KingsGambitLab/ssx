'use client';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useEffect, useState } from 'react';

import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import AdvancedFilters from '@modules/sst/alumni-directory/components/AdvancedFilters';

import tracker from "@lib/tracking";

import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const { onFilterChange, filters } = useAlumniList();

  const handleSearch = () => {
    tracker.click({
      click_type: "filter_clicked",
      click_text: "search_filter",
      click_source: "search_bar",
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