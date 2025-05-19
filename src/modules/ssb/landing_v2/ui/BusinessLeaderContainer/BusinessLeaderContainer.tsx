"use client";

import styles from "@modules/ssb/landing_v2/ui/BusinessLeaderContainer/BusinessLeaderContainer.module.scss";

import BusinessLeaderCard from "@modules/ssb/landing_v2/components/BusinessLeaderCard/BusinessLeaderCard";

import Section from "@components/common/Section";

import { BUSINESS_LEADERS } from "@modules/ssb/landing_v2/constants";

export default function BusinessLeaderContainer() {
  return (
    <Section
      section_class="business-leader-container"
      id="business-leader-container"
    >
      <div className={styles.businessLeaderContainer}>
        <div className={styles.businessLeaderContainerTitle}>
          <div className={styles.businessLeaderContainerTitleText1}>
            {BUSINESS_LEADERS.title}
          </div>
          <div className={styles.businessLeaderContainerTitleText2}>
            {BUSINESS_LEADERS.topBusinessLeaders}
          </div>
        </div>
        <div className={styles.businessLeaderCardContainer}>
          {BUSINESS_LEADERS.leaders.map((leader, index) => (
            <BusinessLeaderCard
              key={index}
              name={leader.name}
              image={leader.image}
              company_logo={leader.company_logo}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
