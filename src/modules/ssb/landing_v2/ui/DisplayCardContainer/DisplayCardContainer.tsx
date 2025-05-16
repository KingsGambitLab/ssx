"use client";

import Section from "@components/common/Section";
import styles from "./DisplayCardContainer.module.scss";
import DisplayCard from "@modules/ssb/landing_v2/components/DisplayCard/DisplayCard";

import { DISPLAY_CARD_CONTAINER } from "@modules/ssb/landing_v2/constants";
export default function DisplayCardContainer() {
  return (
    <Section section_class="display-card-container" id="display-card-container">
      <div className={styles.display_card_container}>
        {DISPLAY_CARD_CONTAINER.displayCards.map((card, index) => (
          <DisplayCard
            key={index}
            headText={card.headText}
            sectionText={card.sectionText}
          />
        ))}
      </div>
    </Section>
  );
}
