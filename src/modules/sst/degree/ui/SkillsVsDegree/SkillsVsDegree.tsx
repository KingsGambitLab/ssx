"use client";

import React, { JSX } from "react";
import Image from "next/image";

import Section from "@components/common/Section";
import HorizontalScrollWrapper from "@components/common/HorizontalScroll";

import { pageTrackingSources } from "@modules/sst/degree/utils/tracking";
import { HEADER, JOB_POSTINGS } from "./data";

import styles from "./StylesVsDegree.module.scss";

function JobPostingSource(): JSX.Element {
  return <div className={styles.source}>{JOB_POSTINGS.source}</div>;
}

export default function SkillsVsDegree() {
  const { title, subtitle } = HEADER;

  return (
    <Section section_class={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
        <div className={styles.scrollWrapper}>
          <HorizontalScrollWrapper
            extraComponent={JobPostingSource()}
            slidesToScroll={1}
            slidesToShow={1.4}
            clickSource={pageTrackingSources.skillsVsDegree}
            scrollControlsClassName={styles.scrollControls}
          >
            {JOB_POSTINGS.jobs.map((item) => {
              return (
                <Image
                  key={item.id}
                  width={420}
                  height={420}
                  className={styles.image}
                  src={item.src}
                  alt={item.alt}
                />
              );
            })}
          </HorizontalScrollWrapper>
        </div>
      </div>
    </Section>
  );
}
