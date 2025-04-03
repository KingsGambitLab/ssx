'use client';

import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react';

import tracker from "@lib/tracking";
import CaseUtil from '@lib/caseUtil';

import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';

import styles from './QuickFilters.module.scss';

export default function QuickFilters() {
  const { filters: appliedFilters, onFilterChange, quickFilters } = useAlumniList();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(appliedFilters?.quick || []);

  const trackFilterClick = (filter: string, isSelected: boolean) => {
    tracker.click({
      click_type: isSelected ? "filter_added" : "filter_removed",
      click_text: "quick_filter",
      click_source: "quick_filter",
      custom: {
        filter_name: filter,
        filter_type: "quick",
      },
    });
  };

  const updateFilters = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];
    return updatedFilters;
    // setSelectedFilters((prev) => {
    //   const updatedFilters = prev.includes(filter)
    //     ? prev.filter((f) => f !== filter)
    //     : [...prev, filter];
    //   return updatedFilters;
    // });
  };

  const handleFilterClick = (filter: string) => {
    const updatedFilters = updateFilters(filter);
    const isSelected = updatedFilters.includes(filter);
    setSelectedFilters(updatedFilters);
    onFilterChange({ ...appliedFilters, quick: updatedFilters });
    trackFilterClick(filter, isSelected);
  };

  useEffect(() => {
    setSelectedFilters(appliedFilters?.quick || []);
  }, [appliedFilters]);

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
              onClick={() => handleFilterClick(filter)}
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
                />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
