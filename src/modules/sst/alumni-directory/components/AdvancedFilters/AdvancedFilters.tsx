import { Button, Drawer, Popover } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

import { useDeviceType } from '@hooks/useDeviceType';
import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import { pageTrackingEvents, pageTrackingSources, trackEvent } from '@modules/sst/alumni-directory/utils';
import AdvancedFiltersItems from '@modules/sst/alumni-directory/components/AdvancedFilters/AdvancedFilterItems/AdvancedFiltersItems';

import FunnelIcon from '@public/images/sst/svg/funnel-icon.svg';
import FunnelIconActive from '@public/images/sst/svg/funnel-icon-active.svg';

import styles from './AdvancedFilters.module.scss';


export default function AdvancedFilters() {
  const { filters: appliedFilters } = useAlumniList();
  const [isTabOpen, setIsTabOpen] = useState(false);

  const isAdvancedFiltersApplied = Object.values(appliedFilters?.advanced)
                                          .some(filter => filter.length > 0);

  const { isMobile } = useDeviceType();

  const trackAdvancedFilterActions = (value: boolean) => {
    trackEvent.click({
      clickType: value ? pageTrackingEvents.openAdvancedFilterButton
        : pageTrackingEvents.closeAdvancedFilters,
      clickText: pageTrackingSources.advancedFilter,
      clickSource: pageTrackingSources.advancedFilter,
      custom: {
        filterType: "advanced",
      },
    });
    setIsTabOpen(value);
  }

  const filterIcon = isAdvancedFiltersApplied ?
    <Image src={FunnelIconActive} alt="Applied Filters Icon" />
    : <Image src={FunnelIcon} alt="Filter-icon" />

  if (isMobile) {
    return (
      <>
        <Button
          type="primary"
          color="default"
          variant="solid"
          size="large"
          onClick={() => trackAdvancedFilterActions(true)}
          icon={filterIcon}
        />

        <Drawer
          closable={false}
          open={isTabOpen}
          onClose={() => trackAdvancedFilterActions(false)}
          placement="left"
          styles={{ body: { padding: 0 } }}
          height="100%"
          width="100%"
        >
          <AdvancedFiltersItems onClose={() => setIsTabOpen(false)} />
        </Drawer>
      </>
    )
  }

  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      open={isTabOpen}
      onOpenChange={trackAdvancedFilterActions}
      content={<AdvancedFiltersItems onClose={() => setIsTabOpen(false)} />}
      arrow={false}
      autoAdjustOverflow={false}
      classNames={{ root: styles.popoverContainer }}
    >
      <Button
        type="primary"
        color="default"
        variant="solid"
        size="large"
        icon={filterIcon}
      >
        Filter
      </Button>
    </Popover>
  )
}
