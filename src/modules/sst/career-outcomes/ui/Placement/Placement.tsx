"use client";

import React from "react";

import styles from "./Placement.module.scss";
import { HEADER, TABS_DATA } from "./data";
import Section from "@components/common/Section";
import ScrollableTabLayout from "@modules/sst/career-outcomes/components/ScrollableTabLayout";

export default function Placement() {
  const { subtitle, title } = HEADER;

  return (
    <Section section_class={styles.placement} id="placement">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.tabLayoutContainer}>
            <ScrollableTabLayout tabs={TABS_DATA.map(tab => ({
                ...tab
            }))} />
        </div>
      </div>
    </Section>
  );
}
