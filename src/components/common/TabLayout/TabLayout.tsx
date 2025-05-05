"use client";
import React from "react";
import type { JSX } from "react";
import classNames from "classnames";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/degree/utils/tracking';

export type TabData = {
  key: string;
  label: string;
  content: JSX.Element;
};

type TabLayoutProps = {
  tabs: TabData[];
  defaultActiveKey?: string;
  centered?: boolean;
  className?: string;
};

import styles from "./TabLayout.module.scss";

const TabLayout: React.FC<TabLayoutProps> = ({
  tabs,
  defaultActiveKey,
  centered = false,
  className = "",
}) => {
  const items: TabsProps["items"] = tabs.map((tab) => ({
    key: tab.key,
    label: tab.label,
    children: tab.content,
  }));

  const handleTabChange = (key: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.ctaClicked,
      clickText: key,
      clickSource: pageTrackingSources.degreePathways,
    });
  };
  return (
    <Tabs
      defaultActiveKey={defaultActiveKey || tabs[0].key}
      onChange={handleTabChange}
      items={items}
      centered={centered}
      className={classNames(styles.customTab, className)}
    />
  );
};

export default TabLayout;
