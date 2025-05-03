import Section from "@components/common/Section";
import React from "react";
import { HEADER, STATS, VIDEO_CARD } from "./data";
import StatsCard from "@modules/sst/career-outcomes/components/StatsCard/StatsCard";
import VideoCard from "@modules/sst/career-outcomes/components/VideoCard";

import styles from "./Entrepreneurship.module.scss";

export default function Entrepreneurship() {
  const { thumbnail, content, footer } = VIDEO_CARD;

  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.header}>{HEADER}</div>
        <div className={styles.statsCardContainer}>
          {STATS.map((item) => {
            return (
              <StatsCard key={item.id} title={item.title} desc={item.desc} />
            );
          })}
        </div>
        <div className={styles.videoCardContainer}>
          <VideoCard thumbnail={thumbnail} content={content} footer={footer} />
        </div>
      </div>
    </Section>
  );
}
