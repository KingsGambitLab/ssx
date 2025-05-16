import Image from "next/image";

import { useDeviceType } from "@hooks/useDeviceType";
import { CareerStatsCardProps } from "@modules/sst/info/types";

import styles from "./CareerStatsCard.module.scss";

export default function CareerStatsCard({
  title,
  desc,
  image,
  variant = "primary",
  fullWidth = false,
}: CareerStatsCardProps) {
  const { isMobile } = useDeviceType();

  return (
    <div
      className={styles.container}
      data-variant={variant}
      data-full-width={fullWidth}
    >
      <div data-variant={variant} className={styles.heading}>
        {title}
      </div>
      <div data-variant={variant} className={styles.desc}>
        {desc}
      </div>
      {image && !isMobile && (
        <Image
          src={image}
          alt=""
          width={283}
          height={283}
          className={styles.bgImage}
        />
      )}
    </div>
  );
}
