import { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import styles from './QuickFilters.module.scss';

interface QuickFiltersProps {
  filters: string[];
}

export default function QuickFilters({ filters = [] }: QuickFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const isSelected = (filter: string) => selectedFilters.includes(filter);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      isSelected(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Quick Filter:</div>

      <div className={styles.filters}>
        {filters.map((filter) => (
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
            {filter}
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
