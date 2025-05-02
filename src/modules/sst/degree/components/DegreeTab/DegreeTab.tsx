import React from "react";
import Image from "next/image";
import { FourYearsData, ThreeYearsData } from "./data";

import styles from "./DegreeTab.module.scss";
import classNames from "classnames";

type DegreeTabProps = {
  data: FourYearsData | ThreeYearsData;
};

export default function DegreeTab({ data }: DegreeTabProps) {
  const { title, subtitle, cardContainer, pointers, ctaText, ctaIcon } = data;

  const badge = "badge" in data ? data.badge : null;

  return (
    <div className={styles.container}>
      {badge && <div className={styles.badge}>{badge}</div>}
      <div
        className={classNames(styles.content, {
          [styles.contentNew]: badge,
        })}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>
          <div className={styles.subtitle}>{subtitle}</div>
          {cardContainer}
          <div className={styles.pointers}>{pointers}</div>
          <div className={styles.ctaContainer}>
            <div className={styles.cta}>
              {ctaText}
              <Image
                className={styles.ctaIcon}
                src={ctaIcon}
                alt="arrow-right-up"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
