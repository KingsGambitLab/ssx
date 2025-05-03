import Image from "next/image";
import React from "react";

import styles from "./VideoCard.module.scss";

type VideoCardProps = {
  thumbnail: string;
  content: string;
  footer: string;
};

export default function VideoCard({
  thumbnail,
  content,
  footer,
}: VideoCardProps) {
  return (
    <div className={styles.container}>
      <Image
        width={400}
        height={300}
        className={styles.thumbnail}
        src={thumbnail}
        alt="thumbnail"
      />
      <div className={styles.content}>
        <div className={styles.body}>{content}</div>
        <div className={styles.footer}>{footer}</div>
      </div>
    </div>
  );
}
