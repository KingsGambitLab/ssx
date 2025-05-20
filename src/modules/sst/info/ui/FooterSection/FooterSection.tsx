"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import {
  trackEvent,
  pageTrackingEvents,
  pageTrackingSources,
} from "@modules/sst/info/utils/tracking";

import ArrowRightUp from "@public/images/sst/svg/arrow-right-up-white.svg";
import FooterBg from "@public/images/sst/webp/footer-bg.webp";

import styles from "./FooterSection.module.scss";

const FooterSection: React.FC = () => {
  const trackEventHandler = (text: string, link: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.ctaClicked,
      clickSource: pageTrackingSources.footer,
      custom: {
        link: link,
        text: text,
      },
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.text}>
          <span>Take the First Step </span>towards becoming a part of{" "}
          <span>the Top 1% of Software Engineers in the country!</span>
        </div>
        <Link
          onClick={() =>
            trackEventHandler("/school-of-technology", "Know more about SST")
          }
          href={"/school-of-technology"}
          className={styles.link}
        >
          Know more about SST
          <Image
            className={styles.linkIcon}
            src={ArrowRightUp}
            alt="arrow-right-up"
          />
        </Link>
      </div>
      <Image className={styles.footerBgImage} src={FooterBg} alt="footer-bg" />
    </footer>
  );
};

export default FooterSection;
