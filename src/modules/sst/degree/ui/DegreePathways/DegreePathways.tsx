import React, { JSX } from "react";

import GraduationHat from "@public/images/sst/svg/graduation-hat-badge-blue.svg";
import { headerData, tabsData } from "./data";

import styles from "./DegreePathways.module.scss";
import TabLayout from "@components/common/TabLayout/TabLayout";
import Section from "@components/common/Section";

type HeaderProps = {
  src: string;
  title: string;
  subtitle: JSX.Element;
};

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

export default function DegreePathways() {
  const { title, subtitle } = headerData;

  return (
    <Section id="degree-pathways">
      <div className={styles.container}>
        <Header src={GraduationHat} title={title} subtitle={subtitle} />
        <TabLayout className={styles.customTab} tabs={tabsData} />
      </div>
    </Section>
  );
}
