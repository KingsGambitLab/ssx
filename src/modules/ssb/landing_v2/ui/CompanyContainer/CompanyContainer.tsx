"use client";

import styles from "./CompanyContainer.module.scss";
import Image from "next/image";

import Section from "@components/common/Section";

import FancyDisplayCard from "../../components/FancyDisplayCard/FancyDisplayCard";

import { COMPANY_CONTAINER } from "@modules/ssb/landing_v2/constants";

export default function CompanyContainer() {
  return (
    <Section section_class="company-container" id="company-container">
      <div className={styles.companyContainer}>
        <div className={styles.companyContainerTitle}>
          {COMPANY_CONTAINER.title}
          <span className={styles.companyContainerTitle2}>
            {" "}
            {COMPANY_CONTAINER.topBusinessLeaders}
          </span>
        </div>
        <div className={styles.companyContainerImage}>
          {COMPANY_CONTAINER.logos.map((logo, index) => (
            <Image
              src={logo.image}
              alt={logo.name}
              className={styles.companyContainerImageLogo}
              key={index}
              width={100}
              height={100}
            />
          ))}
        </div>
        <div className={styles.displayCardContainer}>
          {COMPANY_CONTAINER.displayCards.map((card, index) => (
            <FancyDisplayCard
              key={index}
              headText={card.headText}
              sectionText={card.sectionText}
            />
          ))}
        </div>
        <div className={styles.highlightTextContainer}>
          {COMPANY_CONTAINER.highlightText}{" "}
          <span className={styles.highlightTextContainerSpan1}>
            {COMPANY_CONTAINER.highlightText2}
          </span>{" "}
          {COMPANY_CONTAINER.highlightText3}{" "}
          <span className={styles.highlightTextContainerSpan1}>
            {COMPANY_CONTAINER.highlightText4}
          </span>{" "}
          {COMPANY_CONTAINER.highlightText5}
        </div>
      </div>
    </Section>
  );
}
