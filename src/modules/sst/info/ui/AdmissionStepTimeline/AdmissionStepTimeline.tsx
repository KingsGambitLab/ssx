"use client";

import React from "react";

import Section from "@components/common/Section";
import VideoCard from "@modules/sst/info/components/VideoCard";

import { useStepTimeline } from "@hooks/useStepTimeline";
import { AdmissionStepTimelineData } from "@modules/sst/info/utils/data";

import AdmissionStepCard from "@modules/sst/info/components/AdmissionStepCard";

import styles from "./AdmissionStepTimeline.module.scss";

export default function AdmissionStepTimeline() {
  useStepTimeline({
    className: "admission",
  });
  return (
    <Section id="admission-step-timeline">
      <div className={styles.container}>
        <div className={styles.title}>{AdmissionStepTimelineData.title}</div>
        <VideoCard
          thumbnail={AdmissionStepTimelineData.thumbnail}
          videoId={AdmissionStepTimelineData.video}
        />
        <div className={styles.steps}>
          {AdmissionStepTimelineData.steps.map((step, index) => {
            const length = AdmissionStepTimelineData.steps.length;
            return (
              <AdmissionStepCard
                id={index + 1}
                title={step.title}
                desc={step.desc}
                isFirst={index === 0}
                isLast={index === length - 1}
                className="admission"
              />
            );
          })}
        </div>
      </div>
    </Section>
  );
}
