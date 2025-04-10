import React from "react";

import Image from "next/image";
import bannerImage from "@public/images/sst/webp/scaler-logo-blue.webp";
import styles from './index.module.scss';

export default function Banner() {
  return (
    <div className={styles.waitlistBanner}>
      <h3 className={styles.waitlistBannerTitle}>
        Begin your journey with us
      </h3>
      <Image
        src={bannerImage}
        alt="SST Banner"
        className={styles.bannerImage}
      />
    </div>
  )
}
