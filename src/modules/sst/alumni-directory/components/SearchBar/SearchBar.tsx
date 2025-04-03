'use client';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import AdvancedFilters from '@modules/sst/alumni-directory/components/AdvancedFilters';

import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const { onFilterChange, filters } = useAlumniList();

  const handleSearch = useCallback(() => {
    onFilterChange({ ...filters, search: searchValue });
  }, [filters, onFilterChange, searchValue]);

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