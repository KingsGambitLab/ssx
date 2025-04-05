import classNames from 'classnames';
import Link from 'next/link';

import { Button, Popover } from 'antd';

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
    </div>
  )
}

export default function PostLoginActions({
  buttonOnClick,
  buttonLabel = 'Resume Application',
  buttonClassName = '',
  buttonDisabled = false,
  rootClassName = '',
  data,
}: PostLoginActionsProps) {

  const { isTabletOrMobile } = useDeviceType();

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
        >
          <Button onClick={() => trackEventHandler(pageTrackingEvents.userMenuClicked)}>
            Click me
          </Button>
        </Popover>
      )}
    </div>
  )
}