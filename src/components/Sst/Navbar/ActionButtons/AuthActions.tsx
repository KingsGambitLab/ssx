'use client';

import dynamic from 'next/dynamic';

import { data as signupData } from './data';

import styles from './AuthActions.module.scss';

export default function AuthActions() {
  const isUserPresent = false;

  const LoginActions = dynamic(() => import('@components/NavbarButtons/LoginActions'), { ssr: false });
  const PostLoginActions = dynamic(() => import('@components/NavbarButtons/PostLoginActions'), { ssr: false });

  const onLoginHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  }

  const onApplyHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  }

  const onResumeApplicationHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  }

  return (
    <div className={styles.container}>
      {isUserPresent ? (
        <PostLoginActions
          buttonLabel="Resume Application"
          buttonOnClick={onResumeApplicationHandler}
          data={signupData}
        />
      ) : (
        <LoginActions
          onLogin={onLoginHandler}
          onApply={onApplyHandler}
        />
      )}
    </div>
  );
}