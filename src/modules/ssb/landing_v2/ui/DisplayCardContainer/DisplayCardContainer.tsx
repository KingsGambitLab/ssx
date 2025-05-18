'use client';

import styles from './DisplayCardContainer.module.scss';
import DisplayCard from '@modules/ssb/landing_v2/components/DisplayCard/DisplayCard';

export default function DisplayCardContainer() {
    return (
        <div className={styles.display_card_container}>
              <DisplayCard headText="Bangalore" sectionText="On-campus" />
              <DisplayCard headText="18 Months" sectionText="Includes 3-month internship" />
        </div>
    )
}