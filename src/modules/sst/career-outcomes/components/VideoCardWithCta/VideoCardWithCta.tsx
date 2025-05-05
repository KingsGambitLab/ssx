import Button from "antd/es/button";
import React from "react";
import Image from "next/image";

import styles from "./VideoCardWithCta.module.scss";

type VideoCardWitchCtaProps = {
  thumbnail: string;
  title: string;
  desc: string;
  ctaText: string;
  link?: string;
};

export default function VideoCardWithCta({
  thumbnail,
  title,
  desc,
  ctaText,
  link,
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
        <Button
          type="primary"
          onClick={() => window.open(link, "_blank")}
          className={styles.ctaButton}
          block
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
