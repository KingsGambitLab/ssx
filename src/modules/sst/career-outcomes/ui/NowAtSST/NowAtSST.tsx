'use client';

import { FC } from 'react';
import Image from 'next/image';

import AmazonLogoSvg from '@public/images/sst/svg/amazonlogo.svg';

import Section from '@components/common/Section';

import styles from './NowAtSST.module.scss';

interface StatBoxProps {
  number: string;
  description: string;
}

const StatBox: FC<StatBoxProps> = ({ number, description }) => {
  return (
    <div className={styles.statBox}>
      <div className={styles.statNumberWrapper}>
        <div className={styles.statNumber}>{number}</div>
      </div>
      <div className={styles.statDescriptionWrapper}>
        <div className={styles.statDescription}>{description}</div>
      </div>
    </div>
  );
};

const AmazonLogo: FC = () => {
  return (
    <div className={styles.amazonLogoContainer}>
      <Image 
        src={AmazonLogoSvg}
        alt="Amazon logo"
        width={248}
        height={74}
        className={styles.amazonLogoImage}
      />
      <div className={styles.amazonDescription}>
        Scaler placed more software engineers in Amazon than all IIT's combined
      </div>
    </div>
  );
};

const NowAtSST: FC = () => {
  return (
    <Section section_class={styles.section} id="now-at-sst">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.subtitle}>10+ YEARS OF SCALER LEGACY</div>
          <div className={styles.title}>Now at Scaler School of Technology</div>
        </div>
        
        <div className={styles.statsContainer}>
          <StatBox 
            number="30K+" 
            description="Upskilled with Scaler's online programs in CS, Data Science, Machine Learning & AI in the last 10 years"
          />
          <StatBox 
            number="1200+" 
            description="top hiring partners have recruited talent from Scaler so far"
          />
          <AmazonLogo />
        </div>
      </div>
    </Section>
  );
};

export default NowAtSST;