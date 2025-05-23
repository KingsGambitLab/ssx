"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

import Section from '@components/common/Section';

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/career-outcomes/utils/tracking';

import { OutcomeHeroData } from '@modules/sst/career-outcomes/utils/data';

import DegreeHeroImage from '@public/images/sst/webp/career.webp';

import styles from './OutcomeHero.module.scss';

const DegreeHero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Use Intersection Observer to detect when the component enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('video-container');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <Section section_class={styles.section} id="outcome-hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              SST prepares you for<br/>3 outcomes
            </h2>
            <div className={styles.descWrapper}>
              <div className={styles.points}>
                {OutcomeHeroData.points.map((point, index) => (
                  <div key={index} className={styles.point}>
                    <Image src={point.icon} alt={point.text} width={24} height={24} className={styles.pointIcon}/>
                    <div className={styles.pointText}>{point.text}</div>
                  </div>
                ))}
              </div>
              <div className={styles.description}>
               Let’s look at what’s happened so far!
              </div>
            </div>
          </div>
          <div id="video-container" className={styles.imageWrapper}>
            {isInView ? (
              <div className={styles.videoContainer}>
                {!isVideoLoaded && (
                  <div className={styles.thumbnailContainer} onClick={() => {
                    trackEvent.click({
                      clickType: 'click', 
                      clickText: pageTrackingEvents.videoPlayed,
                      clickSource: pageTrackingSources.heroSection,
                      custom: {
                        link: 'https://www.youtube.com/watch?v=mxeKIZEH6V4',
                      }
                    });
                    setIsVideoLoaded(true)
                  }}>
                    <Image
                      src={DegreeHeroImage}
                      alt="Students using VR technology"
                      width={541}
                      height={306}
                      className={styles.image}
                    />
                    <div className={styles.playButton} onClick={() => setIsVideoLoaded(true)}>
                      <span className={styles.playIcon}></span>
                    </div>
                  </div>
                )}
                {(isInView && isVideoLoaded) && (
                  <iframe
                    src="https://www.youtube.com/embed/mxeKIZEH6V4?autoplay=1"
                    title="Scaler School of Technology Video"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className={styles.iframe}
                  ></iframe>
                )}
              </div>
            ) : (
              <Image
                src={DegreeHeroImage}
                alt="Students using VR technology"
                width={541}
                height={306}
                className={styles.image}
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DegreeHero;
