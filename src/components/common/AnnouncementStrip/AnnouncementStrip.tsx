// 'use client';
import classNames from 'classnames';
import Image from 'next/image';

import styles from './AnnouncementStrip.module.scss';
// import tracker from '@lib/tracking';

type AnnouncementStripProps = {
  rootClassName?: string;
  textClassName?: string;
  iconSrc: string;
  content: string;
  highlightText: string;
  redirectUrl: string;
}

export default function AnnounceStrip({
  rootClassName = '',
  textClassName = '',
  iconSrc,
  content = 'Apply early and avail up to 100% scholarships! Click here to',
  highlightText = 'Know More',
  redirectUrl,
}: AnnouncementStripProps) {

  // const trackEvent = () => {
  //   tracker.click({
  //     click_type: 'announcement_strip_clicked',
  //     click_text: 'know_more',
  //     click_source: 'announcement_strip',
  //   });
  // }
  return (
    <div className={classNames(styles.container, rootClassName)}>
      <div className={styles.content}>
        <Image src={iconSrc} alt="Scroll Page" width={24} height={24} />
        <div className={classNames(styles.headingText, textClassName)}>
          {content}
          {' '}
          <a href={redirectUrl} target="_blank" rel="noopener noreferrer">
            {highlightText}
          </a>
        </div>
      </div>
    </div>
  );
};