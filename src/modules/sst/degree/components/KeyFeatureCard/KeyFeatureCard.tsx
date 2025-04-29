"use client";

import Image from 'next/image';
import { ZoomInOutlined } from '@ant-design/icons';

import { KeyFeatureCardProps } from '@modules/sst/degree/types';
import { useDeviceType } from '@hooks/useDeviceType';
import HorizontalScrollWrapper from '@components/common/HorizontalScroll';

import styles from './KeyFeatureCard.module.scss';

export default function KeyFeatureCard({
  title,
  desc,
  icon,
  alt,
  featureList,
}: KeyFeatureCardProps) {
  const { isMobile } = useDeviceType();
  return (
    <div className={styles.container}>
      <Image
        src={icon}
        alt={alt}
        width={60}
        height={60}
        className={styles.icon}
      />

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
        </div>

        {featureList && featureList?.length > 0 && !isMobile && (
          <HorizontalScrollWrapper slidesToScroll={1} slidesToShow={1.8}>
            {featureList.map((item, index) => (
              <div key={index} className={styles.featureListItem}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={271}
                  height={264}
                  className={styles.featureListItemImage}
                />
                <div className={styles.zoomIcon}>
                  <ZoomInOutlined className={styles.zoomIconIcon} />
                </div>
              </div>
            ))}
          </HorizontalScrollWrapper>
        )}
      </div>
    </div>
  );
}
