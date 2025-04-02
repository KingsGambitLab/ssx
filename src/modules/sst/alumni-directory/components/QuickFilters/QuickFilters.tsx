'use client';

import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useCallback } from 'react';

import CaseUtil from '@libs/caseUtil';

import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';

import styles from './QuickFilters.module.scss';

export default function QuickFilters() {
  const { filters: appliedFilters, onFilterChange, quickFilters } = useAlumniList();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(appliedFilters?.quick || []);

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter];

      onFilterChange({ ...appliedFilters, quick: updatedFilters });
      return updatedFilters;
    });
  }, [appliedFilters, onFilterChange]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Quick Filter:</div>

      <div className={styles.filters}>
        {quickFilters.map((filter) => {
          const isSelected = (filter: string) => selectedFilters.includes(filter);

          return (
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
              {filter === 'up' ? 'UP' :
                (CaseUtil.toCase('titleCase', filter) as string)
              }
              {isSelected(filter) && (
                <CloseOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFilter(filter);
                  }}
                />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
