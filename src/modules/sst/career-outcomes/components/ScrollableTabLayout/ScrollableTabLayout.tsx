"use client";

import React, { useEffect } from "react";
import classNames from "classnames";

import { TabData } from "@components/common/TabLayout/TabLayout";
import { trackEvent, pageTrackingSources } from "@modules/sst/career-outcomes/utils/tracking";

import styles from "./ScrollableTabLayout.module.scss";
import { useScrollSpy } from "@hooks/useScrollSpy";

export type ScrollableTabLayoutProps = {
  tabs: TabData[];
  extraLabelClassName?: string;
  extraContentClassName?: string;
};

export function scrollToTabContent(
  tabKey: string,
  tabs: string[],
  options?: ScrollIntoViewOptions
) {
  const el = document.getElementById(`${tabKey}__content`);

  if (window.innerWidth <= 1200) {
    tabs.forEach((tab) => {
      const elem = document.getElementById(`${tab}__content`);
      elem?.classList.add("hidden");
    });
    el?.classList.remove("hidden");
  } else {
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
        ...options,
      });
    }
  }
}

export default function ScrollableTabLayout({
  tabs,
  extraLabelClassName,
  extraContentClassName,
}: ScrollableTabLayoutProps) {
  const tabIds = tabs.map((tab) => tab.key);
  const activeTabId = useScrollSpy(tabIds, 10);

  useEffect(() => {
    if (window.innerWidth >= 1200) {
      tabs.forEach((tab) => {
        const elem = document.getElementById(`${tab}__content`);
        elem?.classList.remove("hidden");
      });
    } else {
      tabs.forEach((tab, index) => {
        if (index !== 0) {
          const elem = document.getElementById(`${tab}__content`);
          elem?.classList.add("hidden");
        }
      });
    }
  }, []);

  if (tabs.length === 0) {
    return null;
  }

  const trackEventHandler = (tabKey: string) => {
    trackEvent.click({
      clickType: 'click',
      clickText: tabKey,
      clickSource: pageTrackingSources.placementTab,
    });
  };

  const handleTabClick = (tabKey: string) => {
    trackEventHandler(tabKey);
    scrollToTabContent(tabKey, tabs.map((tab) => tab.key));
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            id={`${tab.key}__label`}
            className={classNames(
              styles.label,
              extraLabelClassName,
              tab.key === activeTabId && styles.active
            )}
            onClick={() => handleTabClick(tab.key)}
          >
            {activeTabId === tab.key ? tab.labelActive : tab.label}
          </div>
        ))}
      </div>
      <div className={styles.contentContainer}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            id={`${tab.key}__content`}
            className={classNames(styles.content, extraContentClassName)}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
