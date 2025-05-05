'use client';

import React from 'react';
import Image from 'next/image';
import { Typography, Space, Card } from 'antd';

import Section from '@components/common/Section';
import ApplyButton from '@components/Sst/ApplyButton';

import { pageTrackingSources } from '@modules/sst/degree/utils/tracking';

import scalerMlab from '@public/images/sst/webp/scaler-mlab.webp';
import ellipse from '@public/images/sst/svg/ellipse.svg';

import styles from './ApplyCtaBanner.module.scss';

const { Title, Paragraph } = Typography;

const ApplyCtaBanner: React.FC = () => {
  return (
    <Section section_class={styles.applyCtaBanner} id='apply-cta-banner'>
      <Card className={styles.bannerContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.textContent}>
            <Space direction="vertical" className={styles.textSpace}>
              <Title level={2} className={styles.heading}>
                Take the First Step towards becoming a part of the Top 1% of Software Engineers
                in the country!
              </Title>
              <div className={styles.actionContainer}>
                <div className={styles.buttonWrapper}>
                  <ApplyButton
                    className={styles.applyCtaButton}
                    size="large"
                    shouldTrack={true}
                    trackEventSource={pageTrackingSources.applyCtaBanner}
                    showIcon
                  />
                </div>
                <Paragraph className={styles.batchInfo}>
                  Admissions Open for 2025 Batch
                </Paragraph>
              </div>
            </Space>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.ellipseWrapper}>
              <Image 
                src={ellipse.src}
                alt="Background ellipse"
                width={400}
                height={400}
                className={styles.ellipseImage}
              />
            </div>
            <Image
              src={scalerMlab.src} 
              alt="Software Engineer with VR headset" 
              className={styles.bannerImage}
              width={600}
              height={430}
            />
          </div>
        </div>
      </Card>
    </Section>
  );
};

export default ApplyCtaBanner;
