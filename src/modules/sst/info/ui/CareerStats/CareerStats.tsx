"use client";

import {
  CareerStatsData,
  CareerStatsHeader,
} from "@modules/sst/info/utils/data";

import Section from "@components/common/Section";
import CareerStatsCard from "@modules/sst/info/components/CareerStatsCard";

import styles from "./CareerStats.module.scss";

export default function CareerStats() {
  return (
    <Section section_class={styles.section} id="career-stats">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.subtitle}>{CareerStatsHeader.subtitle}</div>
          <div className={styles.title}>
            {CareerStatsHeader.title}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            {CareerStatsData?.stats?.map((stat, index) => {
              return (
                <CareerStatsCard
                  key={index}
                  title={stat.title}
                  desc={stat.desc}
                  variant={stat.variant as "primary" | "tertiary" | undefined}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
