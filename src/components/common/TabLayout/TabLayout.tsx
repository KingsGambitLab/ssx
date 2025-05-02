import React from "react";
import type { JSX } from "react";
import classNames from "classnames";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

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

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey || tabs[0].key}
      items={items}
      centered={centered}
      className={classNames(styles.customTab, className)}
    />
  );
};

export default TabLayout;
