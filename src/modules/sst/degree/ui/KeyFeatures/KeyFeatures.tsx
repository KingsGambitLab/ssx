'use client';

import { Button } from 'antd';

import Section from '@components/common/Section';

import KeyFeatureCard from '@modules/sst/degree/components/KeyFeatureCard';
import { keyFeaturesData } from '@modules/sst/degree/utils/data';
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from '@modules/sst/degree/utils/tracking';

import ArrowUpRight from '@public/images/common/svg/arrow-up-right.svg';

import styles from './KeyFeatures.module.scss';

export default function KeyFeatures() { 

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
          <div className={styles.footer}>
            <Button
              size="large"
              type="primary"
              icon={<img src={ArrowUpRight.src} alt='arrow-up-right' />}
              iconPosition="end"
              onClick={() => { 
                trackEvent.click({
                  clickType: pageTrackingEvents.ctaClicked,
                  clickText: pageTrackingEvents.explorePlacementButtonClicked,
                  clickSource: pageTrackingSources.keyFeatures,
                  custom: {
                    link: keyFeaturesData?.cta?.link
                  }
                });
                window.open(keyFeaturesData?.cta?.link, '_blank');
              }}
              className={styles.placementButton}
            >
              {keyFeaturesData?.cta?.title}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}