import React, { JSX } from "react";
import Image from "next/image";
import classNames from "classnames";

type DegreeCardProps = {
  src?: string;
  degree: JSX.Element;
  duration?: string;
  blue: boolean;
};

import styles from "./DegreeCard.module.scss";

export default function DegreeCard({
  src,
  degree,
  duration,
  blue,
}: DegreeCardProps) {
  return (
    <div
      className={classNames(styles.container, {
        [styles.containerBlue]: blue,
        [styles.containerPink]: !blue,
        [styles.containerDuration]: duration,
      })}
    >
      {src && (
        <div className={styles.imageContainer}>
          <Image className={styles.image} src={src} alt="medal" />
        </div>
      )}
      <div className={styles.degree}>{degree}</div>
      {duration && <div className={styles.duration}>{duration}</div>}
    </div>
  );
}
