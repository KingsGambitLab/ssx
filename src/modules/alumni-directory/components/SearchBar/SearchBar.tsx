'use client';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { useAlumniList } from '@/hooks/useAlumniList';
import AdvancedFilters from '../AdvancedFilters/AdvancedFilters';

import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const { onFilterChange, filters } = useAlumniList();

  const handleSearch = useCallback(() => {
    onFilterChange({ ...filters, search: searchValue });
  }, [filters, onFilterChange, searchValue]);

  return (
    <div className={styles.mainContainer}>
      <AdvancedFilters />
      <Input
        size="large"
        placeholder="Search by name, city, state or school"
        variant="filled"
        className={styles.searchBarInput}
        onPressEnter={handleSearch}
        onChange={(e) => setSearchValue(e.target.value)}
        suffix={<SearchOutlined onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />}
      />
    </div>
  );
}