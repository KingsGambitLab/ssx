"use client";

import Section from "@components/common/Section";
import Image from "next/image";
import ssbLogo from "@public/images/ssb/ssb_logo-white.webp";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <Section section_class={styles.navbar} id="navbar">
      <div className={styles.container}>
        <Image
          src={ssbLogo}
          alt="School of Business Logo"
          width={117}
          height={34}
          className={styles.logoImage}
        />
      </div>
    </Section>
  );
}
