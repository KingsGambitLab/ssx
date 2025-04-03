import { Button } from "antd";
import classNames from 'classnames';

import tracker from "@lib/tracking";

import styles from './LoginActions.module.scss';

type LoginActionsProps = {
  rootClassName?: string;
  onLogin: () => void;
  onApply: () => void;
  loginLabel?: string;
  applyLabel?: string;
  loginButtonClassName?: string;
  applyButtonClassName?: string;
  disableLogin?: boolean;
  disableApply?: boolean;
};

export default function LoginActions({
  onLogin,
  onApply,
  rootClassName = '',
  loginLabel = 'Login',
  applyLabel = 'Apply Now',
  loginButtonClassName = '',
  applyButtonClassName = '',
  disableLogin = false,
  disableApply = false,
}: LoginActionsProps) {
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
        variant="outlined"
        className={classNames(styles.loginButton, loginButtonClassName)}
        onClick={() => {
          trackEvent(loginLabel);
          onLogin();
        }}
        disabled={disableLogin}
      >
        {loginLabel}
      </Button>
      <Button
        size='large'
        color="danger"
        variant="solid"
        className={classNames(styles.applyNowButton, applyButtonClassName)}
        onClick={() => {
          trackEvent(applyLabel);
          onApply();
        }}
        disabled={disableApply}
      >
        {applyLabel}
      </Button>
    </div>
  )
}