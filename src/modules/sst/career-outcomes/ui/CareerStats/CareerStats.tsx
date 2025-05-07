'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useDeviceType } from '@hooks/useDeviceType';
import { CareerStatsData } from '../../utils/data';

import { pageTrackingEvents, pageTrackingSources, trackEvent } from '@modules/sst/career-outcomes/utils/tracking';

import Section from '@components/common/Section';
import DownloadBrochure from '@components/Sst/DownloadBrochure';
import CareerStatsCard from '../../components/CareerStatsCard/CareerStatsCard';

import YoutubeModal from '@components/common/YouTubeModal';

import styles from './CareerStats.module.scss';

export default function CareerStats() {
  const { isMobile } = useDeviceType();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const trackEventHandler = (clickText: string, clickSource: string, custom?: object) => {
    trackEvent.click({
      clickType: 'click',
      clickText: clickText,
      clickSource: clickSource,
      custom: custom,
    });
  }

  const handleOpen = () => {
    trackEventHandler(pageTrackingEvents.videoPlayed, pageTrackingSources.careerStats, {
      link: `https://www.youtube.com/watch?v=${CareerStatsData?.video?.videoId}`,
    });
    setIsVideoOpen(true);
  }
  const handleClose = () => {
    trackEventHandler(pageTrackingEvents.videoClosed, pageTrackingSources.careerStats, {
      link: `https://www.youtube.com/watch?v=${CareerStatsData?.video?.videoId}`,
    });
    setIsVideoOpen(false);
  }

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
                  width={480}
                  className={styles.videoThumbnail}
                />
                <div className={styles.videoTitleWrapper}>
                  <div className={styles.videoTitle}>
                    {CareerStatsData?.video?.title}
                  </div>
                  <div className={styles.videoDesc}>
                    {CareerStatsData?.video?.desc} 
                    {' '}
                    <button className={styles.videoButton} onClick={handleOpen} aria-label="Play video">
                      {CareerStatsData?.video?.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <div className={styles.downloadBrochure}>
          <DownloadBrochure 
            text="Download Brochure"
            brochureLink={CareerStatsData?.brochureLink}
            buttonSize="large"
            className={styles.downloadBrochureButton}
            trackEventSource="career_stats"
          />
       </div>
      </div>

      <YoutubeModal
        videoId={CareerStatsData?.video?.videoId || ""}
        isOpen={isVideoOpen}
        onClose={handleClose}
        width="50%"
        mobileWidth="100%"
        height="50vh"
        mobileHeight="50vh"
      />
    </Section>
  )
}