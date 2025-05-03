"use client";

import React from "react";

import styles from "./Placement.module.scss";
import TabLayout from "@components/common/TabLayout/TabLayout";
import { HEADER, TABS_DATA } from "./data";
import Section from "@components/common/Section";

export default function Placement() {
  const { subtitle, title } = HEADER;

  return (
    <Section section_class={styles.placement}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.tabLayoutContainer}>
          <TabLayout className={styles.tabLayout} tabs={TABS_DATA} />
        </div>
      </div>
    </Section>
  );
}
