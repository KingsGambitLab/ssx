import { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import CaseUtil from '@/libs/caseUtil';

import styles from './QuickFilters.module.scss';
import { AlumniFilters } from '../../types';

interface QuickFiltersProps {
  filterData: string[];
  appliedFilters: AlumniFilters;
  onFilterChange: (filters: AlumniFilters) => void;
}

export default function QuickFilters({ filterData = [], appliedFilters, onFilterChange }: QuickFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  console.log("appliedFilters", appliedFilters);

  const isSelected = (filter: string) => selectedFilters.includes(filter);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter];

      onFilterChange({ ...appliedFilters, quick: updatedFilters });

      return updatedFilters;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Quick Filter:</div>

      <div className={styles.filters}>
        {filterData.map((filter) => (
          <Button
            key={filter}
            type='text'
            onClick={() => toggleFilter(filter)}
            className={
              isSelected(filter)
                ? styles.selectedFilterButton
                : styles.filterButton
            }
          >
            {String(CaseUtil.toCase('titleCase', filter))}
            {isSelected(filter) && (
              <CloseOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter(filter);
                }}
              />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
