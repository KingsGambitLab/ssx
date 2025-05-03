import React from "react";
import Image from "next/image";

import styles from "./VideoCardWithDesc.module.scss";

type VideoCardWithDescProps = {
  thumbnail: string;
  title: string;
  desc: string;
};

export default function VideoCardWithDesc({
  thumbnail,
  title,
  desc,
}: VideoCardWithDescProps) {
  return (
    <div className={styles.container}>
      <Image
        width={350}
        height={200}
        className={styles.image}
        src={thumbnail}
        alt={"video-thumbnail"}
      />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  );
}
