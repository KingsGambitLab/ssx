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

import { BOTTOM_NAVBAR_LINKS, BOTTOM_NAVBAR_LINKS_REVAMP } from './data';

import styles from './BottomNavbar.module.scss';
import ApplyButton from '@components/Sst/ApplyButton';

export default function BottomNavbar() {
  const { experiments } = useContext(ExperimentsContext);
  const revampedVariant = experiments[ABEX_FLAG_CONFIG.SST_LP_REVAMP.KEY];
  const isRevampedVersion = revampedVariant === ABEX_FLAG_CONFIG.SST_LP_REVAMP.NEW_VARIANT;

  const trackEventHandler = (clickText: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.navButtonClicked,
      clickText,
      clickSource: pageTrackingSources.bottomNavbar,
    });
  };

  if (isRevampedVersion) {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.applyButtonContainer}>
            <ApplyButton
              className={styles.actionButton}
              size="large"
              trackEventSource={pageTrackingSources.bottomNavbar}
              block
            />
          </div>
          <div className={styles.navLinksContainer}>
            <div className={styles.container}>
              {(isRevampedVersion ? BOTTOM_NAVBAR_LINKS_REVAMP : BOTTOM_NAVBAR_LINKS).map((link) => {
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
          </div>
        </div>
      </>
    );
  }

  return <SstBottomNudge />;
}
