import Image from 'next/image';

import { useState } from 'react';

import { Button, Checkbox, Drawer, Popover, Tabs } from 'antd';


import { useDeviceType } from '@/hooks/useDeviceType';

import FunnelIcon from '@/public/images/sst/svg/funnel-icon.svg';

import styles from './AdvancedFilters.module.scss';

type AdvancedFiltersProps = {
  state: string[];
  city: string[];
  batchYear: number[];
  clubs: string[];
};

const FilterTabs = ({ filters, onClose }: { filters: AdvancedFiltersProps; onClose: () => void }) => {
  const tabsElements = Object.entries(filters).map(([key, values], index) => ({
    label: key,
    key: String(index),
    children: (
      <div className={styles.tabContent}>
        {values.map((value) => (
          <div className={styles.checkboxContainer} key={String(value)}>
            <Checkbox value={value} />
            {value}
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <div className={styles.headingText}>Filters</div>
        <Button type="primary" disabled>
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
        <Button value="default" size='large' onClick={onClose} className={styles.closeButton}>
          Close
        </Button>
        <Button type="primary" size='large' className={styles.applyButton}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default function AdvancedFilters({ filters }: { filters: AdvancedFiltersProps }) {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const { isMobile } = useDeviceType();

  return (
    <>
      {isMobile ? (
        <>
          <Button
            type="primary"
            color="default"
            variant="solid"
            size="large"
            onClick={() => setIsTabOpen(true)}
            icon={<Image src={FunnelIcon} alt="Filter-icon" />}
          />

          <Drawer
            closable={false}
            open={isTabOpen}
            onClose={() => setIsTabOpen(false)}
            placement="left"
            styles={{ body: { padding: 0 } }}
            height="100%"
            width="100%"
          >
            <FilterTabs filters={filters} onClose={() => setIsTabOpen(false)} />
          </Drawer>
        </>
      ) : (
        <Popover
          placement="bottomLeft"
          trigger="click"
          open={isTabOpen}
          onOpenChange={setIsTabOpen}
          content={<FilterTabs filters={filters} onClose={() => setIsTabOpen(false)} />}
          arrow={false}
          autoAdjustOverflow={false}
          classNames={{ root: styles.popoverContainer }}
        >
          <Button
            type="primary"
            color="default"
            variant="solid"
            size="large"
            icon={<Image src={FunnelIcon} alt="Filter-icon" />}
          >
            Filter
          </Button>
        </Popover>
      )}
    </>
  );
}
