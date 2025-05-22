import React, { JSX } from "react";

import Image from "next/image";

import styles from "./BannerCard.module.scss";

export default function BannerCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string | JSX.Element;
}) {
  return (
    <div className={styles.card}>
      <Image
        width={40}
        height={40}
        className={styles.icon}
        src={icon}
        alt="banner-icon"
      />
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
}
