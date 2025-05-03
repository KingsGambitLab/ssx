import React from "react";
import Image from "next/image";

import styles from "./VideoCardWithCta.module.scss";

type VideoCardWitchCtaProps = {
  thumbnail: string;
  title: string;
  desc: string;
  ctaText: string;
};

export default function VideoCardWithCta({
  thumbnail,
  title,
  desc,
  ctaText,
}: VideoCardWitchCtaProps) {
  return (
    <div className={styles.container}>
      <Image
        width={350}
        height={200}
        className={styles.image}
        src={thumbnail}
        alt="yt-thumbnail"
      />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
      <div className={styles.ctaContainer}>
        <div className={styles.cta}>{ctaText}</div>
      </div>
    </div>
  );
}
