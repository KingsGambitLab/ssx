"use client";

import React from "react";

import HorizontalScrollWrapper from "@components/common/HorizontalScroll";
import VideoCardWithDesc from "@modules/sst/career-outcomes/components/VideoCardWithDesc";
import Section from "@components/common/Section";

import { useDeviceType } from "@hooks/useDeviceType";

import { HEADER, VIDEO_CARDS } from "./data";
import { pageTrackingSources } from "@modules/sst/career-outcomes/utils/tracking";

import styles from "./InnovationLabProjects.module.scss";

export default function InnovationLabProjects() {
  const { title } = HEADER;
  const { isMobile } = useDeviceType();

  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.header}>{title}</div>
        <div className={styles.scrollView}>
          <HorizontalScrollWrapper slidesToShow={isMobile ? 1.5 : 2.4} clickSource={pageTrackingSources.innovationLabProjects}>
            {VIDEO_CARDS.map((video) => {
              return (
                <VideoCardWithDesc
                  key={video.id}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  desc={video.desc}
                  videoId={video.videoId}
                  titleClass={styles.videoCardTitle}
                  trackEventSource={pageTrackingSources.innovationLabProjects}
                />
              );
            })}
          </HorizontalScrollWrapper>
        </div>
      </div>
    </Section>
  );
}
