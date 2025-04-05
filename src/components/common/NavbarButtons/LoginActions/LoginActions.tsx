import { Button } from "antd";
import classNames from 'classnames';

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from '@modules/sst/alumni-directory/utils';

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
        variant="outlined"
        className={classNames(styles.loginButton, loginButtonClassName)}
        onClick={() => {
          trackEventHandler(pageTrackingEvents.loginButtonClicked);
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
          trackEventHandler(pageTrackingEvents.applyButtonClicked);
          onApply();
        }}
        disabled={disableApply}
      >
        {applyLabel}
      </Button>
    </div>
  )
}