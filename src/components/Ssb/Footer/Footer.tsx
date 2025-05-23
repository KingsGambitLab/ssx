"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { FOOTER_SECTIONS, SOCIAL_LINKS, APP_DOWNLOAD_LINK } from "./constants";

import YouTubeIcon from "@public/images/sst/svg//youtube.svg";
import InstagramIcon from "@public/images/sst/svg//instalogo.svg";
import LinkedInIcon from "@public/images/sst/svg//linkedin-icon.svg";
import TwitterIcon from "@public/images/sst/svg//twitterlogo.svg";
import FacebookIcon from "@public/images/sst/svg//meta.svg";
import QuoraIcon from "@public/images/sst/svg//quora.svg";
import GooglePlayIcon from "@public/images/sst/svg/downloadongoogleplay.svg";
import SSBLogoLight from "@public/images/ssb/ssb-logo-footer.svg";

import {
  trackEvent,
  pageTrackingEvents,
  pageTrackingSources,
} from "@modules/ssb/landing_v2/utils/tracking";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  // Function to get appropriate icon based on platform
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return YouTubeIcon;
      case "Instagram":
        return InstagramIcon;
      case "LinkedIn":
        return LinkedInIcon;
      case "Twitter":
        return TwitterIcon;
      case "Facebook":
        return FacebookIcon;
      case "Quora":
        return QuoraIcon;
      default:
        return TwitterIcon;
    }
  };

  const trackEventHandler = (text: string, link: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.ctaClicked,
      clickSource: pageTrackingSources.Footer,
      custom: {
        link: link,
        text: text,
      },
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__branding}>
          <div className={styles.footer__logo}>
            <Image
              src={SSBLogoLight}
              alt="Scaler School of Business"
              width={300}
              height={150}
            />
            <div>#CreateImpact</div>
          </div>

          <div className={styles.playstore}>
            <Link
              href={APP_DOWNLOAD_LINK}
              className={styles.playstore__link}
              onClick={() =>
                trackEventHandler("Get it on Google Play", APP_DOWNLOAD_LINK)
              }
            >
              <Image
                src={GooglePlayIcon}
                alt="Get it on Google Play"
                width={216}
                height={72}
                className={styles.playstore__image}
              />
            </Link>
          </div>
        </div>

        <div className={styles.footer__coloumn}>
          {/* Our Offerings */}
          <div className={styles["footer-items"]}>
            <h3 className={styles["footer-items__heading"]}>
              {FOOTER_SECTIONS[0].title}
            </h3>
            <div className={styles["footer-items__content"]}>
              {FOOTER_SECTIONS[0].links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className={styles["footer-items__link"]}
                  onClick={() => trackEventHandler(link.text, link.href)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className={styles["footer-items"]}>
            <h3 className={styles["footer-items__heading"]}>
              {FOOTER_SECTIONS[1].title}
            </h3>
            <div className={styles["footer-items__content"]}>
              {FOOTER_SECTIONS[1].links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className={styles["footer-items__link"]}
                  onClick={() => trackEventHandler(link.text, link.href)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Teach at Scaler */}
          <div className={styles["footer-items"]}>
            <h3 className={styles["footer-items__heading"]}>
              {FOOTER_SECTIONS[2].title}
            </h3>
            <div className={styles["footer-items__content"]}>
              {FOOTER_SECTIONS[2].links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className={styles["footer-items__link"]}
                  onClick={() => trackEventHandler(link.text, link.href)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className={styles["footer-items"]}>
            <h3 className={styles["footer-items__heading"]}>
              {FOOTER_SECTIONS[3].title}
            </h3>
            <div className={styles["footer-items__content"]}>
              {FOOTER_SECTIONS[3].links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className={styles["footer-items__link"]}
                  onClick={() => trackEventHandler(link.text, link.href)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Follow us on */}
          <div className={styles.footer__social}>
            <h3 className={styles["footer-items__heading"]}>Follow us on</h3>
            <div className={styles["footer-items__social"]}>
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.platform}
                  href={social.href}
                  aria-label={social.ariaLabel}
                  className={styles["footer-items__link"]}
                  onClick={() =>
                    trackEventHandler(social.platform, social.href)
                  }
                >
                  <Image
                    src={getSocialIcon(social.platform)}
                    alt={social.platform}
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Other */}
          <div className={styles["footer-items"]}>
            <h3 className={styles["footer-items__heading"]}>
              {FOOTER_SECTIONS[4].title}
            </h3>
            <div className={styles["footer-items__content"]}>
              {FOOTER_SECTIONS[4].links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className={styles["footer-items__link"]}
                  onClick={() => trackEventHandler(link.text, link.href)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className={styles.footer__copyright}>
        © 2024 InterviewBit Technologies Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
