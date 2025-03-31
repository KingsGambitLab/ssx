'use client';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import AdvancedFilters from '../AdvancedFilters/AdvancedFilters';

import styles from './SearchBar.module.scss';
import { useCallback, useState } from 'react';
import { AlumniFilters } from '../../types';

type AdvancedFiltersProps = {
  state: string[];
  city: string[];
  batchYear: string[];
  clubs: string[];
};

type SearchBarProps = {
  advancedFilters: AdvancedFiltersProps;
  appliedFilters: AlumniFilters;
  onFilterChange: (filters: AlumniFilters) => void;
}

export default function SearchBar({ appliedFilters, onFilterChange, advancedFilters }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = useCallback(() => {
    onFilterChange({ ...appliedFilters, search: searchValue });
  }, [appliedFilters, onFilterChange, searchValue]);

  return (
    <div className={styles.mainContainer}>
      <AdvancedFilters
        filters={advancedFilters}
        appliedFilters={appliedFilters as AlumniFilters}
        onFilterChange={(filters: AlumniFilters) => onFilterChange(filters)}
      />
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