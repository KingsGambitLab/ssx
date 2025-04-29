'use client';

import Image from "next/image";

import { useDeviceType } from "@hooks/useDeviceType";

import banner from "@public/images/sst/webp/banner.webp";
import bannerMweb from "@public/images/sst/webp/banner-mweb.webp";
import Section from "@components/common/Section";

import styles from "./Banner.module.scss";

export default function Banner() {
  const { isTablet, isMobile } = useDeviceType();
  
  return (
    <Section section_class='banner' id='banner'>
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
        src={isMobile || isTablet ? bannerMweb : banner}
        alt="SST Banner"
        height={isMobile ? 130 : 230}
        width={isMobile ? 212 : 520}
        className={styles.bannerImage}
      />
      </div>
    </Section>
  )
}