import Image from 'next/image';
import scrollImage from '@/public/images/sst/svg/scroll-page.svg';

import styles from './AnnouncementStrip.module.scss';

export default function AnnounceStrip({
  content = 'Apply early and avail up to 100% scholarships! Click here to',
  highlightText = 'Know More',
  redirectUrl = '/',
}: {
  content: string;
  highlightText: string;
  redirectUrl: string;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={scrollImage} alt="Scroll Page" width={24} height={24} />
        <div>
          <span className={styles.heading}>
            {content}
          </span>
          {' '}
          <a href={redirectUrl} target="_blank" rel="noopener noreferrer" className={styles.highlight}>
            {highlightText}
          </a>
        </div>
      </div>
    </div>
  );
};