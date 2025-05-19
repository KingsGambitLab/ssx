"use client";

import { useState, useEffect } from "react";

import styles from "./StudentFeatureContainer.module.scss";
import Image from "next/image";
import Section from "@components/common/Section";

import {
  trackEvent,
  pageTrackingEvents,
  pageTrackingSources,
} from "@modules/ssb/landing_v2/utils/tracking";

import { STUDENT_FEATURE_CONTAINER } from "@modules/ssb/landing_v2/constants";

export default function StudentFeatureContainer() {
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

    const element = document.getElementById("video-container");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <Section id="student-feature-container">
      <div className={styles.studentFeatureContainer}>
        <div className={styles.studentFeatureContainerTitle}>
          <div className={styles.studentFeatureContainerTitleText2}>
            <div className={styles.studentFeatureContainerTitleText2Text1}>
              {STUDENT_FEATURE_CONTAINER.topBusinessLeaders}{" "}
              <span>{STUDENT_FEATURE_CONTAINER.topBusinessLeaders2}</span>
            </div>
            <div className={styles.studentFeatureContainerTitleText2Text2}>
              {STUDENT_FEATURE_CONTAINER.subText}
            </div>
          </div>
        </div>

        <div className={styles.studentFeatureContainerImageGrid}>
          {STUDENT_FEATURE_CONTAINER.imageGrid.map((image, index) => (
            <Image
              key={index}
              src={image.image}
              alt={image.alt}
              className={styles[image.className]}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ))}
        </div>

        <div className={styles.studentFeatureContainerVideoImage}>
          <div id="video-container" className={styles.imageWrapper}>
            {isInView ? (
              <div className={styles.videoContainer}>
                {!isVideoLoaded && (
                  <div
                    className={styles.thumbnailContainer}
                    onClick={() => {
                      setIsVideoLoaded(true);
                      trackEvent.click({
                        clickType: pageTrackingEvents.videoPlayed,
                        clickSource:
                          pageTrackingSources.StudentFeatureContainer,
                        custom: {
                          link: "https://www.youtube.com/embed/P7uEQ9jjqsY?autoplay=1",
                        },
                      });
                    }}
                  >
                    <Image
                      src={STUDENT_FEATURE_CONTAINER.videoImage.image}
                      alt="Students using VR technology"
                      width={541}
                      height={306}
                      className={
                        styles[STUDENT_FEATURE_CONTAINER.videoImage.className]
                      }
                    />
                  </div>
                )}
                {isInView && isVideoLoaded && (
                  <iframe
                    src="https://www.youtube.com/embed/P7uEQ9jjqsY?autoplay=1"
                    title="Scaler School of Technology Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            ) : (
              <Image
                src={STUDENT_FEATURE_CONTAINER.videoImage.image}
                alt="Students using VR technology"
                width={541}
                height={306}
                className={
                  styles[STUDENT_FEATURE_CONTAINER.videoImage.className]
                }
              />
            )}
          </div>

          <div className={styles.studentFeatureContainerFooterText}>
            <div className={styles.studentFeatureContainerFooterText1}>
              {STUDENT_FEATURE_CONTAINER.videoTitle}{" "}
              <span>{STUDENT_FEATURE_CONTAINER.videoTitleSpan}</span>
            </div>
            <div className={styles.studentFeatureContainerFoooterText2}>
              {STUDENT_FEATURE_CONTAINER.videoSubtitle}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
