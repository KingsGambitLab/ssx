import React, { JSX } from "react";
import Image from "next/image";
import classnames from "classnames";

import BlueDot from "@public/images/sst/svg/blue-dot.svg";

import styles from "./AdmissionStepCard.module.scss";

type AdmissionStepCardProps = {
  id: number;
  title: string;
  desc: string | JSX.Element;
  isFirst: boolean;
  isLast: boolean;
  className: string;
};

export default function AdmissionStepCard({
  id,
  title,
  desc,
  isFirst,
  isLast,
  className,
}: AdmissionStepCardProps) {
  return (
    <div
      className={classnames(
        styles.card,
        {
          [`${className}__step-container-first`]: isFirst,
          [`${className}__step-container-last`]: isLast,
        },
        {
          [styles.firstStep]: isFirst,
          [styles.lastStep]: isLast,
        }
      )}
    >
      <div
        className={classnames(styles.left, {
          [styles.stepLastLeft]: isLast,
        })}
      >
        {isFirst && (
          <div
            className={classnames(
              styles.growingDiv,
              `${className}__growing-div`
            )}
          />
        )}
        <Image
          className={styles.icon}
          src={BlueDot}
          alt="blue-dot-icon"
          height={20}
          width={20}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.stepId}>STEP {id}</div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  );
}
