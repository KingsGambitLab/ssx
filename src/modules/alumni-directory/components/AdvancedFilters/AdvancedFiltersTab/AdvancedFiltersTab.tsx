import { Checkbox, Tabs, Button } from 'antd';

import CaseUtil from '@/libs/caseUtil';
import {
  AlumniFilters,
  AdvancedFiltersType,
  DEFAULT_ADVANCED_FILTERS
} from '@/modules/alumni-directory/types';

import styles from './AdvancedFiltersTab.module.scss';

type AdvancedFilterTabsProps = {
  appliedFilters: AlumniFilters;
  applyFilterHandler: (filters: AlumniFilters) => void;
  filters: AdvancedFiltersType;
  onClose: () => void;
  selectedFilters: AdvancedFiltersType;
  setSelectedFilters: (filters: AdvancedFiltersType) => void;
};

export default function AdvancedFilterTabs({ appliedFilters, applyFilterHandler, filters, onClose, selectedFilters, setSelectedFilters }: AdvancedFilterTabsProps) {
  const clearAllFilters = () => {
    setSelectedFilters(DEFAULT_ADVANCED_FILTERS);
    onClose();
    applyFilterHandler({
      ...appliedFilters,
      advanced: DEFAULT_ADVANCED_FILTERS
    });
  };

  const hasSelectedAdvancedFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  const applyFilters = () => {
    applyFilterHandler({
      quick: appliedFilters.quick,
      advanced: selectedFilters,
      search: appliedFilters.search
    });
    onClose();
  }

  const updateSelectedFilters = (key: string, value: string, checked: boolean) => {
    const currentValues = selectedFilters[key as keyof AdvancedFiltersType] || [];

    const newFilters = {
      ...selectedFilters,
      [key]: checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value)
    };

    setSelectedFilters(newFilters);
  };

  const tabsElements = Object.entries(filters).map(([key, values], index) => {
    const selectedValues = selectedFilters[key as keyof AdvancedFiltersType] || [];

    const orderedValues = [
      ...selectedValues,
      ...values.filter(value => !selectedValues.includes(value))
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
                onChange={(e) => updateSelectedFilters(key, value, e.target.checked)}
              />
              {value}
            </div>
          ))}
        </div>
      )
    };
  });

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <div className={styles.headingText}>Filters</div>
        <Button
          color="default"
          variant="solid"
          size="large"
          onClick={clearAllFilters}
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
        <Button type="default" size='large' onClick={onClose} className={styles.closeButton}>
          Close
        </Button>
        <Button type="primary" size='large' className={styles.applyButton} onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}