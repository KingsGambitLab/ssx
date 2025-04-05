'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/alumni-directory/utils';

import styles from './AnnouncementStrip.module.scss';


type AnnouncementStripProps = {
  rootClassName?: string;
  textClassName?: string;
  iconSrc: string;
  content: string;
  highlightText: string;
  redirectUrl: string;
}

export default function AnnouncementStrip({
  rootClassName = '',
  textClassName = '',
  iconSrc,
  content = 'Apply early and avail up to 100% scholarships! Click here to',
  highlightText = 'Know More',
  redirectUrl,
}: AnnouncementStripProps) {

  const trackEventHandler = () => {
    trackEvent.click({
      clickType: pageTrackingEvents.announcementStripClicked,
      clickText: 'know_more',
      clickSource: pageTrackingSources.announcementStrip,
    });
  }
  return (
    <div className={classNames(styles.container, rootClassName)}>
      <div className={styles.content}>
        <Image src={iconSrc} alt="Scroll Page" width={24} height={24} />
        <div className={classNames(styles.headingText, textClassName)}>
          {content}
          {' '}
          <Link href={redirectUrl}
            prefetch={false}
            target="_blank"
            onClick={trackEventHandler}
          >
            {highlightText}
          </Link>
        </div>
      </div>
    </div>
  );
};