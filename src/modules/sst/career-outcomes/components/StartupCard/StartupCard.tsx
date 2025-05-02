"use client";

import { Button } from "antd";
import Image from "next/image";

import { StartupCardProps } from "../../types";

import ArrowUpRight from "@public/images/common/svg/arrow-up-right-black.svg";

import styles from "./StartupCard.module.scss";

export default function StartupCard({ image, name, desc, cta_text, link }: StartupCardProps) {
  return (
    <div className={styles.container}>
      {image &&
        <Image
          src={image}
          alt={name}
          height={357}
          width={201}
          className={styles.projectImage}
        />
      }

      <div className={styles.content}>
        <div className={styles.infoWrapper}>
          <div className={styles.name}>
            {name}
          </div>
          <div className={styles.desc}>
            {desc}
          </div>
        </div>

        <Button
          type="primary"
          onClick={() => window.open(link, "_blank")}
          className={styles.ctaButton}
          iconPosition="end"
          icon={<img src={ArrowUpRight.src} alt="arrow-up-right" />}
          block
        >
          {cta_text}
        </Button>
      </div>
    </div>
  );
}