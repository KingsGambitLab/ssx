'use client';

import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import useUser from '@hooks/useUser';
import { useLoginModalContext } from '@context/sst/LoginModalContext';

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from '@modules/sst/degree/utils/tracking';

import styles from './ApplyButton.module.scss';

interface ApplyButtonProps {
  text?: string;
  resumeText?: string;
  className?: string;
  size?: 'large' | 'middle' | 'small';
  showIcon?: boolean;
  block?: boolean;
  shouldTrack?: boolean;
  trackEventSource?: string;
  trackEventCustom?: object;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  text = "Apply Now",
  resumeText = "Resume Application",
  className = "",
  size = "middle",
  showIcon = false,
  block = false,
  shouldTrack = false,
  trackEventSource = '',
  trackEventCustom = {},
}) => {
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isloggedIn;
  const { setIsLoginModalOpen } = useLoginModalContext();


  const onApplyHandler = () => {
    if (shouldTrack) {
      trackEvent.click({
        clickType: pageTrackingEvents.ctaClicked,
        clickText: pageTrackingEvents.applyNowClicked,
        clickSource: trackEventSource,
        custom: trackEventCustom,
      });
    }
    setIsLoginModalOpen(true);
  };

  const onResumeApplicationHandler = () => {
    if (shouldTrack) {
      trackEvent.click({
        clickType: pageTrackingEvents.ctaClicked,
        clickText: pageTrackingEvents.resumeApplicationClicked,
        clickSource: trackEventSource,
        custom: trackEventCustom,
      });
    }
    window.open("/school-of-technology/application/");
  };

  if (isLoggedIn) {
    return (
      <Button
        size={size}
        type="primary"
        className={`${styles.resumeButton} ${className}`}
        onClick={onResumeApplicationHandler}
        block={block}
      >
        {resumeText}
      </Button>
    );
  }

  return (
    <Button
      size={size}
      type="primary"
      className={`${styles.applyButton} ${className}`}
      onClick={onApplyHandler}
      block={block}
    >
      {text} {showIcon && <ArrowRightOutlined />}
    </Button>
  );
};

export default ApplyButton; 