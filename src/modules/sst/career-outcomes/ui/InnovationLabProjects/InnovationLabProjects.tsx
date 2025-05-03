"use client";

import React from "react";

import HorizontalScrollWrapper from "@components/common/HorizontalScroll";
import VideoCardWithDesc from "@modules/sst/career-outcomes/components/VideoCardWithDesc";
import Section from "@components/common/Section";

import { HEADER, VIDEO_CARDS } from "./data";

import styles from "./InnovationLabProjects.module.scss";

export default function InnovationLabProjects() {
  const { title } = HEADER;
  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.header}>{title}</div>
        <div className={styles.scrollView}>
          <HorizontalScrollWrapper slidesToShow={1.8}>
            {VIDEO_CARDS.map((video) => {
              return (
                <VideoCardWithDesc
                  key={video.id}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  desc={video.desc}
                />
              );
            })}
          </HorizontalScrollWrapper>
        </div>
      </div>
    </Section>
  );
}
