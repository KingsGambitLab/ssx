"use client";

import { Button } from 'antd';

import Section from '@components/common/Section';
import KeyFeatureCard from '@modules/sst/degree/components/KeyFeatureCard';

import { useDeviceType } from '@hooks/useDeviceType';
import { keyFeaturesData } from '@modules/sst/degree/utils/data';

import ArrowUpRight from '@public/images/common/svg/arrow-up-right.svg';

import styles from './KeyFeatures.module.scss';

export default function KeyFeatures() { 
  const { isMobile } = useDeviceType();

  return (
    <Section section_class='key-features' id='key-features'>
      <div className = {styles.container}>
        <div className = {styles.title}>
          Key Features
        </div>
        <div className={styles.content}>
          <div className={styles.features}>
            {keyFeaturesData?.features?.map((item, index) => (
            <KeyFeatureCard 
              key={index}
              alt={item.title}
              title={item.title}
              desc={item.desc}
              icon={item.icon}
              featureList={item.featureList}
              />
            ))}
          </div>
          {
            !isMobile && (
              <div className={styles.footer}>
                <Button
                  size="large"
                  type="primary"
                  icon={<img src={ArrowUpRight.src} alt='arrow-up-right' />}
                  iconPosition="end"
                  onClick={() => window.open(keyFeaturesData?.cta?.link, '_blank')}
                  className={styles.placementButton}
                >
                  {keyFeaturesData?.cta?.title}
                </Button>
            </div>
            )
         }
        </div>
      </div>
    </Section>
  )
}