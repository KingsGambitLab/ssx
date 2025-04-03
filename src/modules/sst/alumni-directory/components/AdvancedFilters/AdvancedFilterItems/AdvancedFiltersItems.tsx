'use client';

import { Button, Checkbox, Tabs } from 'antd';
import { useCallback, useMemo, useEffect, useState, useRef } from 'react';

import CaseUtil from '@lib/caseUtil';

import { AdvancedFiltersType } from '@modules/sst/alumni-directory/types';
import {
  DEFAULT_ADVANCED_FILTERS,
  DEFAULT_ALUMNI_FILTERS
} from '@modules/sst/alumni-directory/constants';
import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import tracker from '@lib/tracking';

import styles from './AdvancedFiltersItems.module.scss';

type AdvancedFiltersItemsProps = {
  onClose: () => void;
}

export default function AdvancedFiltersItems({ onClose }: AdvancedFiltersItemsProps) {
  const hasTracked = useRef(false);
  const { onFilterChange, advancedFilters, filters } = useAlumniList();

  const [selectedFilters, setSelectedFilters] = useState<AdvancedFiltersType>(() =>
    filters?.advanced || DEFAULT_ADVANCED_FILTERS
  );

  const hasSelectedAdvancedFilters = useMemo(
    () => Object.values(selectedFilters).some((arr) => arr.length > 0),
    [selectedFilters]
  );

  const trackEvent = ({ click_type, method = 'click' }: {
    click_type: string;
    method?: 'click' | 'view';
  }) => {
    tracker[method]({
      click_type,
      click_text: click_type,
      click_source: "advanced_filter",
      custom: {
        filter_type: "advanced",
        filter_values: selectedFilters,
      },
    });
  }

  const clearAllFiltersHandler = useCallback(() => {
    setSelectedFilters(DEFAULT_ADVANCED_FILTERS);
    onFilterChange(DEFAULT_ALUMNI_FILTERS);
    onClose();
    trackEvent({ click_type: "clear_all_filters" });
  }, [onFilterChange, onClose]);

  const applyFilters = useCallback(() => {
    onFilterChange({
      quick: filters.quick,
      advanced: selectedFilters,
      search: filters.search
    });
    onClose();
    trackEvent({ click_type: "apply_advanced_filters" });
  }, [filters, selectedFilters, onFilterChange, onClose]);

  const closeFiltersHandler = () => {
    onClose();
    trackEvent({ click_type: "close_advanced_filters" });
  };

  const updateSelectedFilters = useCallback(
    (key: string, value: string, checked: boolean) => {
      setSelectedFilters((prev) => {
        const currentValues = prev[key as keyof AdvancedFiltersType] || [];
        const updatedValues = checked
          ? [...new Set([...currentValues, value])]
          : currentValues.filter((v) => v !== value);

        return {
          ...prev,
          [key]: updatedValues
        };
      });
    },
    []
  );

  const tabsElements = useMemo(() => {
    return Object.entries(advancedFilters).map(([key, values], index) => {
      const selectedValues = selectedFilters[key as keyof AdvancedFiltersType] || [];

      const orderedValues = [
        ...selectedValues,
        ...values.filter((v) => !selectedValues.includes(v))
      ];

      return {
        label: CaseUtil.toCase('titleCase', key) as string,
        key: String(index),
        children: (
          <div className={styles.tabContent}>
            {orderedValues.map((value) => (
              <div className={styles.checkboxContainer} key={`${key}-${value}`}>
                <Checkbox
                  checked={selectedValues.includes(value)}
                  value={value}
                  onChange={(e) =>
                    updateSelectedFilters(key, value, e.target.checked)
                  }
                />
                {value}
              </div>
            ))}
          </div>
        )
      };
    });
  }, [advancedFilters, selectedFilters, updateSelectedFilters]);

  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent({ click_type: 'advanced_filter_modal_opened', method: 'view' })
      hasTracked.current = true;
    }
    setSelectedFilters({ ...filters?.advanced });
  }, [filters?.advanced]);

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <div className={styles.headingText}>Filters</div>
        <Button
          color="default"
          variant="solid"
          size="large"
          onClick={clearAllFiltersHandler}
          disabled={!hasSelectedAdvancedFilters}
        >
          Clear all filters
        </Button>
      </div>

      <Tabs
        type="card"
        defaultActiveKey="0"
        tabPosition="left"
        size="large"
        className={styles.filtersTab}
        items={tabsElements}
      />

      <div className={styles.actionButtons}>
        <Button
          type="default"
          size="large"
          onClick={closeFiltersHandler}
          className={styles.closeButton}
        >
          Close
        </Button>
        <Button
          type="primary"
          size="large"
          className={styles.applyButton}
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
