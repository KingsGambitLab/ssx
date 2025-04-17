'use client';

import React, { useContext } from 'react';
import Image from 'next/image';

import { useLoginModalContext, ExperimentsContext } from '@context';
import { useUser } from '@hooks';
import { ABEX_FLAG_CONFIG } from '@utils/abex/constants';
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from '@modules/sst/alumni-directory/utils';

import ActionButton from './ActionButton/ActionButton';
import SstBottomNudge from '@components/Sst/BottomNudge';

import { BOTTOM_NAVBAR_LINKS } from './data';

import styles from './BottomNavbar.module.scss';


export default function BottomNavbar() {
  const { setIsLoginModalOpen } = useLoginModalContext();
  const { data: userData } = useUser();
  const { experiments } = useContext(ExperimentsContext);
  const bottomNavbarVariant = experiments[ABEX_FLAG_CONFIG.BOTTOM_NAVBAR.KEY];
  const isOldVersion = bottomNavbarVariant === ABEX_FLAG_CONFIG.BOTTOM_NAVBAR.DEFAULT_VARIANT;

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

  if (!isOldVersion) {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            {BOTTOM_NAVBAR_LINKS.LEFT.map((link) => {
              return (
                <div className={styles.linkContainer}>
                  <a
                    href={link.redirectUrl}
                    target="_blank"
                    onClick={() => trackEventHandler(link.text)}
                  >
                    <div className={styles.link}>
                      <Image
                        className={styles.linkIcon}
                        alt="icon"
                        src={link.icon}
                      />
                      {link.text}
                    </div>
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
                  <a
                    target="_blank"
                    className={styles.link}
                    href={link.redirectUrl}
                    onClick={() => trackEventHandler(link.text)}
                  >
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
