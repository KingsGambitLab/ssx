'use client';

import { useState, useCallback } from 'react';

import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import CaseUtil from '@/libs/caseUtil';
import { useAlumniList } from '@/hooks/useAlumniList';

import styles from './QuickFilters.module.scss';

export default function QuickFilters() {
  const { filters: appliedFilters, onFilterChange, quickFilters } = useAlumniList();

  const [selectedFilters, setSelectedFilters] = useState<string[]>(appliedFilters?.quick || []);


  console.log("appliedFilters", appliedFilters);

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter];

      onFilterChange({ ...appliedFilters, quick: updatedFilters });
      return updatedFilters;
    });
  }, [appliedFilters, onFilterChange]);

  const isSelected = (filter: string) => selectedFilters.includes(filter);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Quick Filter:</div>

      <div className={styles.filters}>
        {quickFilters.map((filter) => (
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
            {CaseUtil.toCase('titleCase', filter) as string}
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
