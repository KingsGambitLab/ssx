'use client';

import Image from "next/image";

import { useDeviceType } from "@/hooks/useDeviceType";

import styles from "./Banner.module.scss";

export default function Banner() {
  const { isTablet, isMobile } = useDeviceType();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          Welcome to Student Directory of <span>Scaler School of Technology</span>
        </h1>
        <h2 className={styles.subheading}>
          Connect with the Students to learn more about SST
        </h2>
      </div>
      <Image
        src={
          isMobile || isTablet ?
            "/images/sst/webp/banner-mweb.webp" :
            "/images/sst/webp/banner.webp"
        }
        alt="SST Banner"
        height={isMobile ? 130 : 230}
        width={isMobile ? 212 : 520}
        className={styles.bannerImage}
      />
    </div>
  )
}