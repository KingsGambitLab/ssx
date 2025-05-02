'use client';

import Image from 'next/image';

import { useDeviceType } from '@hooks/useDeviceType';

import Section from '@components/common/Section';
import CareerStatsCard from '../components/CareerStatsCard/CareerStatsCard';

import CareerStatsData from '../utils/statsData';

import styles from './CareerStats.module.scss';

export default function CareerStats() {
  const { isMobile } = useDeviceType();

  return (
    <Section section_class='career-stats' id='career-stats'>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            {CareerStatsData?.stats?.map((stat, index) => {
              if (stat?.mobileOnly && !isMobile) return null;

              return (
                <CareerStatsCard 
                  key={index} 
                  title={stat.title}
                  desc={stat.desc}
                  image={stat.image}
                  variant={stat.variant as "primary" | "tertiary" | undefined}
                  fullWidth={stat?.fullWidth}
                />
              )
            })}
          </div>
          {
            !isMobile && (
              <div className={styles.rightContent}>
                <Image
                  src={CareerStatsData?.video?.thumbnail}
                  alt=""
                  height={348}
                  width={454}
                />
              </div>
            )
          }
        </div>
      </div>
    </Section>
  )
}