import React from "react";

import styles from "./StatsCard.module.scss";
import classNames from "classnames";

type StatsCardProps = {
  title: string;
  desc: string;
  cardExtraClassName?: string;
  titleExtraClassName?: string;
  descExtraClassName?: string;
};

export default function StatsCard({
  title,
  desc,
  cardExtraClassName,
  titleExtraClassName,
  descExtraClassName,
}: StatsCardProps) {
  return (
    <div className={classNames(styles.card, cardExtraClassName)}>
      <div className={classNames(styles.title, titleExtraClassName)}>
        {title}
      </div>
      <div className={classNames(styles.desc, descExtraClassName)}>{desc}</div>
    </div>
  );
}
