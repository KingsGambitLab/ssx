"use client";

import React, { useContext } from "react";
import Image from "next/image";

import { ExperimentsContext } from '@context/sst';
import { ABEX_FLAG_CONFIG } from '@utils/abex/constants';
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from "@modules/sst/alumni-directory/utils";

import SstBottomNudge from '@components/Sst/BottomNudge';

import { BOTTOM_NAVBAR_LINKS } from './data';

import styles from './BottomNavbar.module.scss';
import ApplyButton from '../ApplyButton';


export default function BottomNavbar() {
  const { experiments } = useContext(ExperimentsContext);
  const bottomNavbarVariant = experiments[ABEX_FLAG_CONFIG.BOTTOM_NAVBAR.KEY];
  const isOldVersion =
    bottomNavbarVariant === ABEX_FLAG_CONFIG.BOTTOM_NAVBAR.DEFAULT_VARIANT;

  const trackEventHandler = (clickText: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.navButtonClicked,
      clickText,
      clickSource: pageTrackingSources.bottomNavbar,
    });
  };

  if (!isOldVersion) {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.applyButtonContainer}>
            <ApplyButton
              className={styles.actionButton}
              size="large"
              block
            />
          </div>
          <div className={styles.navLinksContainer}>
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
        </div>
      </>
    );
  }

  return <SstBottomNudge />;
}
