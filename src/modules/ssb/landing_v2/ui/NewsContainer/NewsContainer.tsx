'use client';

import styles from './NewsContainer.module.scss';
import Image from 'next/image';

import NewsCard from '@modules/ssb/landing_v2/components/NewsCard/NewsCard';

import HinduDesktop from '@public/images/ssb/hindudesktop.webp';
import BrainfedDesktop from '@public/images/ssb/brainfeeddesktop.webp';
import OutlookDesktop from '@public/images/ssb/outlookdesktop.webp';
import TimeDesktop from '@public/images/ssb/timedesktop.webp';
import TitleHeadline from '@public/images/ssb/title-top-b10603a026d0d8febd6797db047f49c8418a52f9f2cce2bdf5218b7e9533271a.webp';

export default function NewsContainer() {
  return (
    <div className={styles.newsContainer}>

      <div className={styles.headlineContainer}>
        <div className={styles.featuredNewsTitleImg}>
          <img src={TitleHeadline.src} alt="Title Headline" className={styles.titleHeadline} />
          <img src={TitleHeadline.src} alt="Title Headline" className={styles.titleHeadline} />
        </div>

        <div className={`${styles.featuredNewsTitleImg} ${styles['featuredNewsTitleImg--reverse']}`}>
          <img src={TitleHeadline.src} alt="Title Headline" className={styles.titleHeadline} />
          <img src={TitleHeadline.src} alt="Title Headline" className={styles.titleHeadline} />
        </div>
      </div>

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
    </div>
  )
}