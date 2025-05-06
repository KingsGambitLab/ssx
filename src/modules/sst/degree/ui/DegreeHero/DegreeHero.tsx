'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import Section from '@components/common/Section';

import {
  trackEvent,
  pageTrackingEvents,
  pageTrackingSources,
} from '@modules/sst/degree/utils/tracking';

import DegreeHeroImage from '@public/images/sst/webp/degree.webp';

import styles from './DegreeHero.module.scss';

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
    <Section section_class="degree-hero" id="degree-hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              A Degree Designed for the Future, Not the Past
            </h2>
            <div className={styles.description}>
              Traditional engineering degrees were designed decades ago, but the world
              of technology moves fast.
            </div>
            <div className={styles.description}>
              We&apos;ve rethought what a CS programme should be—one that prepares students
              for cutting-edge jobs, entrepreneurship, and higher studies across the world
            </div>
          </div>
          <div id="video-container" className={styles.imageWrapper}>
            {isInView ? (
              <div className={styles.videoContainer}>
                {!isVideoLoaded && (
                  <div className={styles.thumbnailContainer}>
                    <Image
                      src={DegreeHeroImage}
                      alt="Students using VR technology"
                      width={541}
                      height={306}
                      className={styles.image}
                    />
                    <div className={styles.playButton} onClick={() => {
                      setIsVideoLoaded(true);
                      trackEvent.click({
                        clickType: pageTrackingEvents.videoPlayed,
                        clickSource: pageTrackingSources.DegreeHero,
                        custom: {
                          videoLink: "https://www.youtube.com/embed/qh8VHFuoJcQ?autoplay=1",
                        },
                      });
                    }}>
                      <span className={styles.playIcon}></span>
                    </div>
                  </div>
                )}
                {(isInView && isVideoLoaded) && (
                  <iframe
                    src="https://www.youtube.com/embed/qh8VHFuoJcQ?autoplay=1"
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
