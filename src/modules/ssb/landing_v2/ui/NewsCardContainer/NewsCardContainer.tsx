import styles from './NewsCardContainer.module.scss';

import NewsCard from '@modules/ssb/landing_v2/components/NewsCard/NewsCard';
import HinduDesktop from '@public/images/ssb/hindudesktop.webp';
import BrainfedDesktop from '@public/images/ssb/brainfeeddesktop.webp';
import OutlookDesktop from '@public/images/ssb/outlookdesktop.webp';
import TimeDesktop from '@public/images/ssb/timedesktop.webp';

export default function NewsCardContainer() {
  return (
    <div className={styles.newsCardContainer}>
      <NewsCard 
        imageSrc={HinduDesktop}
        boldText="Scaler has launched the Scaler School of Business"
        text=""
      />
      <NewsCard 
        imageSrc={BrainfedDesktop}
        boldText="India's first business school"
        text=" built by industry leaders for future leaders."
      />
      <NewsCard 
        imageSrc={OutlookDesktop}
        boldText="Scaler Diversifies Its Offering, "
        text=" by Launching Scaler School of Business"
      />
      <NewsCard 
        imageSrc={TimeDesktop}
        boldText="TIME World's Top EdTech Companies 2024-"
        text=" Scaler is at the top!"
      />
    </div>
  )
}