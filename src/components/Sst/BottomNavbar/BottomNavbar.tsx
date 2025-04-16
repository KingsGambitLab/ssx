"use client";

import React from "react";
import Image from "next/image";

import { BOTTOM_NAVBAR_LINKS } from "./data";
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from "@modules/sst/alumni-directory/utils";
import { useUser } from "@hooks";
import { useLoginModalContext } from "@context/LoginModalContext";

import ActionButton from "./ActionButton/ActionButton";
import SstBottomNudge from "@components/Sst/BottomNudge";

import styles from "./BottomNavbar.module.scss";

export default function SstBottomNavbar({ oldVersion = true }) {
  const { setIsLoginModalOpen } = useLoginModalContext();
  const { data: userData } = useUser();

  const isLoggedIn = userData?.isloggedIn ?? false;

  const trackEventHandler = (clickText: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.navButtonClicked,
      clickText,
      clickSource: pageTrackingSources.bottomNavbar,
    });
  };

  const onApplyHandler = () => {
    trackEventHandler(pageTrackingEvents.applyButtonClicked);
    setIsLoginModalOpen(true);
  };

  const onResumeApplicationHandler = () => {
    trackEventHandler(pageTrackingEvents.resumeApplicationButtonClicked);
    window.open("/school-of-technology/application/");
  };

  if (oldVersion) {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            {BOTTOM_NAVBAR_LINKS.LEFT.map((link) => {
              return (
                <div className={styles.linkContainer}>
                  <a className={styles.link} href={link.redirectUrl}>
                    <Image
                      className={styles.linkIcon}
                      alt="icon"
                      src={link.icon}
                    />
                    {link.text}
                  </a>
                </div>
              );
            })}
          </div>
          <div className={styles.applyButtonContainer}>
            <ActionButton
              isLoggedIn={isLoggedIn}
              onApply={onApplyHandler}
              onResumeApplication={onResumeApplicationHandler}
            />
          </div>
          <div className={styles.container}>
            {BOTTOM_NAVBAR_LINKS.RIGHT.map((link) => {
              return (
                <div className={styles.linkContainer}>
                  <a className={styles.link} href={link.redirectUrl}>
                    <Image
                      className={styles.linkIcon}
                      alt="icon"
                      src={link.icon}
                    />
                    {!link.active ? link.text : <span>{link.text}</span>}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return <SstBottomNudge />;
}
