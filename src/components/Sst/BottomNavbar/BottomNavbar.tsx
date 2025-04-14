import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import LoginModal from "@modules/sst/waitlist/ui/LoginModal";

import { Button } from "antd";
import { BOTTOM_NAVBAR_LINKS } from "./data";
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from "@modules/sst/alumni-directory/utils";

import styles from "./BottomNavbar.module.scss";
import { useWaitlistCheck } from "@hooks/useWaitlistCheck";
import { useUser } from "@hooks";
import ActionButton from "./ActionButton/ActionButton";

export default function SstBottomNavbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { showWaitlistModal, setShowWaitlistModal } = useWaitlistCheck();
  const { data: userData } = useUser();

  const isLoggedIn = userData?.isloggedIn ?? false;

  const trackEventHandler = (clickText: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.navButtonClicked,
      clickText,
      clickSource: pageTrackingSources.navbar,
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

  const handleModalClose = () => {
    setShowWaitlistModal(false);
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {BOTTOM_NAVBAR_LINKS.LEFT.map((link) => {
            return (
              <div className={styles.link_container}>
                <a className={styles.link} href={link.redirectUrl}>
                  <Image
                    className={styles.link_icon}
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
              <div className={styles.link_container}>
                <a className={styles.link} href={link.redirectUrl}>
                  <Image
                    className={styles.link_icon}
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
      <LoginModal
        isOpen={isLoginModalOpen || showWaitlistModal}
        onClose={handleModalClose}
        onLoginSuccess={() => setIsLoginModalOpen(false)}
        initialStep={showWaitlistModal ? "WAITLIST" : "LOGIN"}
      />
    </>
  );
}
