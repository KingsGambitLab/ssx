"use client";

import React from "react";

import styles from "./Placement.module.scss";
import TabLayout from "@components/common/TabLayout/TabLayout";
import { TABS_DATA } from "./data";
import Section from "@components/common/Section";

export default function Placement() {
  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.subtitle}></div>
          <div className={styles.title}></div>
        </div>
        <div className={styles.tabLayoutContainer}>
          <TabLayout className={styles.tabLayout} tabs={TABS_DATA} />
        </div>
      </div>
    </Section>
  );
}
