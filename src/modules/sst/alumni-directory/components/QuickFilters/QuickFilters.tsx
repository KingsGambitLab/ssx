'use client';

import { useEffect, useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/alumni-directory/utils';

import CaseUtil from '@lib/caseUtil';

import styles from './QuickFilters.module.scss';

export default function QuickFilters() {
  const { filters: appliedFilters, onFilterChange, quickFilters } = useAlumniList();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(appliedFilters?.quick || []);

  const trackFilterClick = (filter: string, isSelected: boolean) => {
    trackEvent.click({
      clickType: isSelected ? pageTrackingEvents.filterApplied : pageTrackingEvents.filterRemoved,
      clickText: pageTrackingEvents.filterApplied,
      clickSource: pageTrackingSources.quickFilters,
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
              {isSelected(filter) && (<CloseOutlined/>)}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
