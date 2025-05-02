import React from "react";
import DegreeCard from "@modules/sst/degree/components/DegreeCard";
import { DegreeData } from "../data";

import styles from "./FourYearDegreeCardsContainer.module.scss";

type FourYearProps = {
  degreeData: DegreeData[];
};

export default function FourYearDegreeCardsContainer({
  degreeData,
}: FourYearProps) {
  const [firstDegreeData, secondDegreeData] = degreeData;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <DegreeCard
          blue
          src={firstDegreeData.src}
          degree={firstDegreeData.degree}
        />
      </div>
      <div className={styles.separatorContainer}>
        <div className={styles.separator}></div>
        <div className={styles.separatorText}>OR</div>
        <div className={styles.separator}></div>
      </div>
      <div className={styles.card}>
        <DegreeCard
          blue={false}
          src={secondDegreeData.src}
          degree={secondDegreeData.degree}
        />
      </div>
    </div>
  );
}
