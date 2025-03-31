import { useState } from 'react';
import Image from 'next/image';
import { Button, Drawer, Popover } from 'antd';

import { useDeviceType } from '@/hooks/useDeviceType';
import {
  AlumniFilters,
  AdvancedFiltersType,
  DEFAULT_ADVANCED_FILTERS
} from '@/modules/alumni-directory/types';

import AdvancedFilterTabs from './AdvancedFiltersTab/AdvancedFiltersTab';

import FunnelIcon from '@/public/images/sst/svg/funnel-icon.svg';
import FunnelIconActive from '@/public/images/sst/svg/funnel-icon-active.svg';

import styles from './AdvancedFilters.module.scss';

interface AdvancedFiltersProps {
  filters: AdvancedFiltersType;
  appliedFilters: AlumniFilters;
  onFilterChange: (filters: AlumniFilters) => void;
}

export default function AdvancedFilters({
  filters,
  appliedFilters,
  onFilterChange
}: AdvancedFiltersProps) {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<AdvancedFiltersType>(DEFAULT_ADVANCED_FILTERS);
  const { isMobile } = useDeviceType();

  const isAdvancedFiltersApplied = Object.values(appliedFilters?.advanced || {}).some(
    filter => filter.length > 0
  );

  const handleTabClose = () => setIsTabOpen(false);

  const FilterButton = () => (
    <Button
      type="primary"
      color="default"
      variant="solid"
      size="large"
      onClick={() => !isMobile && setIsTabOpen(true)}
      icon={
        <Image
          src={isAdvancedFiltersApplied ? FunnelIconActive : FunnelIcon}
          alt={isAdvancedFiltersApplied ? "Applied Filters Icon" : "Filter-icon"}
        />
      }
    >
      {!isMobile && "Filter"}
    </Button>
  );

  const FilterContent = () => (
    <AdvancedFilterTabs
      filters={filters}
      onClose={handleTabClose}
      appliedFilters={appliedFilters}
      applyFilterHandler={onFilterChange}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    />
  );

  if (isMobile) {
    return (
      <>
        <FilterButton />
        <Drawer
          closable={false}
          open={isTabOpen}
          onClose={handleTabClose}
          placement="left"
          styles={{ body: { padding: 0 } }}
          height="100%"
          width="100%"
        >
          <FilterContent />
        </Drawer>
      </>
    );
  }

  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      open={isTabOpen}
      onOpenChange={setIsTabOpen}
      content={<FilterContent />}
      arrow={false}
      autoAdjustOverflow={false}
      classNames={{ root: styles.popoverContainer }}
    >
      <FilterButton />
    </Popover>
  );
}
