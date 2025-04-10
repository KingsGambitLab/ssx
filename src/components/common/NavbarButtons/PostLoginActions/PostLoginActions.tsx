"use client"

import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { Button, Popover } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { logout } from "@modules/common/apis";

import { useDeviceType } from '@hooks/useDeviceType';

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from '@modules/sst/alumni-directory/utils';

import styles from './PostLoginActions.module.scss';

type PostLoginActionsProps = {
  rootClassName?: string;
  buttonLabel: string;
  buttonClassName?: string;
  buttonOnClick: () => void;
  buttonDisabled?: boolean;
  data: {
    label: string;
    href: string;
  }[];
  userName: string;
};

const popoverContent = (data: {
  label: string;
  href: string;
}[]) => {
  const trackEventHandler = (clickText: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.navButtonClicked,
      clickText,
      clickSource: pageTrackingSources.userMenuSection,
    });
  }

  const handleLogout = async () => {
    trackEventHandler('logout');
    await logout();
    window.location.reload();
  }

  return (
    <div className={styles.popoverContent}>
      {data.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target="_blank"
          prefetch={false}
          className={styles.popoverItem}
          onClick={() => trackEventHandler(item.label)}
        >
          {item.label}
        </Link>
      ))}
      <Button
        type="text"
        className={styles.popoverItem}
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </div>
  )
}

export default function PostLoginActions({
  buttonOnClick,
  buttonLabel = 'Resume Application',
  buttonClassName = '',
  buttonDisabled = false,
  rootClassName = '',
  data = [],
  userName = '',
}: PostLoginActionsProps) {

  const { isTabletOrMobile } = useDeviceType();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const trackEventHandler = (clickText: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.navButtonClicked,
      clickText,
      clickSource: pageTrackingSources.navbar,
    });
  }

  return (
    <div className={classNames(styles.actionButtons, rootClassName)}>
      <Button
        size='large'
        color="primary"
        variant="solid"
        className={classNames(styles.button, buttonClassName)}
        onClick={() => {
          trackEventHandler(buttonLabel);
          buttonOnClick();
        }}
        disabled={buttonDisabled}
      >
        {buttonLabel}
      </Button>
      {!isTabletOrMobile && (
        <Popover
          content={popoverContent(data)}
          trigger="click"
          placement="bottomLeft"
          autoAdjustOverflow={true}
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
        >
          <Button 
            onClick={() => trackEventHandler(pageTrackingEvents.userMenuClicked)}
            className={styles.userButton}
            type="text"
          >
            {userName}
            {isPopoverOpen ? (
              <UpOutlined className={styles.icon} />
            ) : (
              <DownOutlined className={styles.icon} />
            )}
          </Button>
        </Popover>
      )}
    </div>
  )
}