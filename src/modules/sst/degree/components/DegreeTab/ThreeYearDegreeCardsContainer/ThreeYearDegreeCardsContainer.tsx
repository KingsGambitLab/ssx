import React from "react";
import Image from "next/image";

import PlusIcon from "@public/images/sst/svg/plus-icon.svg";
import DegreeCard from "@modules/sst/degree/components/DegreeCard";
import { DegreeData } from "../data";

import styles from "./ThreeYearDegreeCardsContainer.module.scss";

type ThreeYearProps = {
  degreeData: DegreeData[];
};

export default function ThreeYearDegreeCardsContainer({
  degreeData,
}: ThreeYearProps) {
  const [firstDegreeData, secondDegreeData, thirdDegreeData, fourthDegreeData] =
    degreeData;

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <DegreeCard
          blue
          degree={firstDegreeData.degree}
          duration={firstDegreeData.duration}
        />
        <div className={styles.icon}>
          <Image src={PlusIcon} alt="plus-icon" width={20} height={20} />
        </div>
        <DegreeCard
          blue={false}
          degree={secondDegreeData.degree}
          duration={secondDegreeData.duration}
        />
      </div>
      <div className={styles.separatorContainer}>
        <div className={styles.separator}></div>
        <div className={styles.separatorText}>OR</div>
        <div className={styles.separator}></div>
      </div>
      <div className={styles.cardContainer}>
        <DegreeCard
          blue
          degree={thirdDegreeData.degree}
          duration={thirdDegreeData.duration}
        />
        <div className={styles.icon}>
          <Image src={PlusIcon} alt="plus-icon" width={20} height={20} />
        </div>
        <DegreeCard
          blue={false}
          degree={fourthDegreeData.degree}
          duration={fourthDegreeData.duration}
        />
      </div>
    </div>
  );
}
