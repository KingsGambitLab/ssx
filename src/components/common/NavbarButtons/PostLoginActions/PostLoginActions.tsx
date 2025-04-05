import { Button, Popover } from "antd";
import classNames from 'classnames';
import { useDeviceType } from "@hooks/useDeviceType";

import styles from './PostLoginActions.module.scss';
import Link from "next/link";
import tracker from "@lib/tracking";

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
  const trackEvent = (clickText: string) => {
    tracker.click({
      click_type: 'nav_button_clicked',
      click_text: clickText,
      click_source: 'user_menu_section',
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
          onClick={() => trackEvent(item.label)}
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

  const trackEvent = (clickText: string) => {
    tracker.click({
      click_type: 'nav_button_clicked',
      click_text: clickText,
      click_source: 'navbar',
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
          trackEvent(buttonLabel);
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
          <Button onClick={() => trackEvent('user_menu_clicked')}>Click me</Button>
        </Popover>
      )}
    </div>
  )
}