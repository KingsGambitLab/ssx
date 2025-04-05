
import { Button } from 'antd';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

import { useAlumniList } from '@/modules/sst/alumni-directory/context/AlumniContext';
import { AlumniFilters } from '../../types';
import { DEFAULT_ALUMNI_FILTERS } from '../../constants';
import { pageTrackingEvents, pageTrackingSources, trackEvent } from '../../utils';

import NoAlumniFoundImage from '@public/images/sst/svg/no-result-found.svg';

import styles from './NoAlumniFound.module.scss';

export default function NoAlumniFound({ onFilterChange }: { onFilterChange: (filters: AlumniFilters) => void }) {
  const { alumniListTotalEntries, filters } = useAlumniList();

  useEffect(() => {
    if (alumniListTotalEntries === undefined) return;

    trackEvent.click({
      clickType: pageTrackingEvents.noAlumniFound,
      clickText: pageTrackingEvents.noAlumniFound,
      clickSource: pageTrackingSources.alumniDirectory,
      custom: {
        filters: filters
      }
    });
  }, [filters]);

  return (
    <div className={styles.container}>
      <div className={styles.searchedResults}>
        Searched Results
        {' '}
        <span>(0 Alumni)</span>
      </div>
      <div className={styles.content}>
        <div className={styles.noResultsFoundContainer}>
          <Image src={NoAlumniFoundImage}
            alt="No Alumni Found"
            height={160}
            width={127}
          />
        </div>
        <div className={styles.noResultFoundMessage}>
          <div className={styles.noResultFoundMessage}>
            No matching profiles found. W&apos;re working on adding more.
          </div>
          <div className={styles.tryDifferentFilters}>
            Tip: Try out different filters
          </div>
          <Button
            type="primary"
            size="large"
            className={styles.goBackButton}
            onClick={() => onFilterChange(DEFAULT_ALUMNI_FILTERS)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div >
  );
}
