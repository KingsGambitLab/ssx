"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import {
  trackEvent,
  pageTrackingEvents,
  pageTrackingSources,
} from "@modules/sst/info/utils/tracking";

import FooterBg from "@public/images/sst/webp/footer-bg.webp";

import styles from "./FooterSection.module.scss";
import { FOOTER_DATA } from "./data";

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
        <div className={styles.text}>{FOOTER_DATA.text}</div>
        <Link
          onClick={() =>
            trackEventHandler("/school-of-technology", FOOTER_DATA.ctaText)
          }
          href={"/school-of-technology"}
          className={styles.link}
        >
          {FOOTER_DATA.ctaText}
          <Image
            width={40}
            height={40}
            className={styles.linkIcon}
            src={FOOTER_DATA.ctaIcon}
            alt="arrow-right-up"
          />
        </Link>
      </div>
      <Image className={styles.footerBgImage} src={FooterBg} alt="footer-bg" />
    </footer>
  );
};

export default FooterSection;
