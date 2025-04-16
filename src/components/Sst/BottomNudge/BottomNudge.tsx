import React from "react";

import { useLoginModalContext } from "@context/LoginModalContext";
import { useUser } from "@hooks";
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from "@modules/sst/alumni-directory/utils";

import styles from "./BottomNudge.module.scss";
import ActionButton from "./ActionButton";

export default function SstBottomNudge() {
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
  return (
    <div className={styles.container}>
      {!isLoggedIn && (
        <div className={styles.text}>
          Admissions Open for <span>2025</span>
        </div>
      )}
      <ActionButton
        isLoggedIn={isLoggedIn}
        onApply={onApplyHandler}
        onResumeApplication={onResumeApplicationHandler}
      />
    </div>
  );
}
