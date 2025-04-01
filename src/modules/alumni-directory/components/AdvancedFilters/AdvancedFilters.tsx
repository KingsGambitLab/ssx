import { useState } from 'react';
import Image from 'next/image';

import { Button, Drawer, Popover } from 'antd';

import { useDeviceType } from '@/hooks/useDeviceType';
import { useAlumniList } from '@/hooks/useAlumniList';
import FunnelIcon from '@/public/images/sst/svg/funnel-icon.svg';
import FunnelIconActive from '@/public/images/sst/svg/funnel-icon-active.svg';

import AdvancedFiltersTabs from './AdvancedFiltersTab/AdvancedFiltersTab';

import styles from './AdvancedFilters.module.scss';

export default function AdvancedFilters() {
  const { filters: appliedFilters } = useAlumniList();
  const [isTabOpen, setIsTabOpen] = useState(false);

  const isAdvancedFiltersApplied = Object.values(appliedFilters?.advanced).some(filter => filter.length > 0);

  const { isMobile } = useDeviceType();


  if (isMobile) {
    return (
      <>
        <Button
          type="primary"
          color="default"
          variant="solid"
          size="large"
          onClick={() => setIsTabOpen(true)}
          icon={
            isAdvancedFiltersApplied ?
              <Image src={FunnelIconActive} alt="Applied Filters Icon" />
              : <Image src={FunnelIcon} alt="Filter-icon" />
          }
        />

        <Drawer
          closable={false}
          open={isTabOpen}
          onClose={() => setIsTabOpen(false)}
          placement="left"
          styles={{ body: { padding: 0 } }}
          height="100%"
          width="100%"
          className={styles.drawerContainer}
        >
          <AdvancedFiltersTabs onClose={() => setIsTabOpen(false)} />
        </Drawer>
      </>
    )
  }

  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      open={isTabOpen}
      onOpenChange={setIsTabOpen}
      content={<AdvancedFiltersTabs onClose={() => setIsTabOpen(false)} />}
      arrow={false}
      autoAdjustOverflow={false}
      classNames={{ root: styles.popoverContainer }}
    >
      <Button
        type="primary"
        color="default"
        variant="solid"
        size="large"
        icon={
          isAdvancedFiltersApplied ?
            <Image src={FunnelIconActive} alt="Applied Filters Icon" />
            : <Image src={FunnelIcon} alt="Filter-icon" />
        }
      >
        Filter
      </Button>
    </Popover>
  )
}
