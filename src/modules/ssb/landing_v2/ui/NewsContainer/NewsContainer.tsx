"use client";

import Section from "@components/common/Section";
import styles from "./NewsContainer.module.scss";

import NewsCard from "@modules/ssb/landing_v2/components/NewsCard/NewsCard";

// import HinduDesktop from '@public/images/ssb/hindudesktop.webp';
// import BrainfedDesktop from '@public/images/ssb/brainfeeddesktop.webp';
// import OutlookDesktop from '@public/images/ssb/outlookdesktop.webp';
// import TimeDesktop from '@public/images/ssb/timedesktop.webp';
// import TitleHeadline from '@public/images/ssb/title-top-b10603a026d0d8febd6797db047f49c8418a52f9f2cce2bdf5218b7e9533271a.webp';

import { NEWS_CONTAINER } from "@modules/ssb/landing_v2/constants";

export default function NewsContainer() {
  return (
    <Section section_class="news-container" id="news-container">
      <div className={`${styles.newsContainer} news-section`}>
        <div className={styles.headlineContainer}>
          <div className={styles.titleHeadline}>
            {NEWS_CONTAINER.titleHeadline}
            <span className={styles.titleHightlight}>
              {NEWS_CONTAINER.titleHightlight}
            </span>
          </div>
          <div className={styles.subtitle}>{NEWS_CONTAINER.subtitle}</div>
        </div>

        <div className={styles.newsCardContainer}>
          {NEWS_CONTAINER.newsCards.map((newsCard, index) => (
            <NewsCard
              key={index}
              imageSrc={newsCard.image}
              boldText={newsCard.boldText}
              text={newsCard.text}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
