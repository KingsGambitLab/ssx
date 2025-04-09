'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import useUser from '@hooks/useUser';
import { menuItems } from './data';
import styles from './AuthActions.module.scss';
import LoginModal from '@modules/sst/waitlist/ui/LoginModal';
import { useWaitlistCheck } from '@hooks/useWaitlistCheck';
import LoginActions from '@components/common/NavbarButtons/LoginActions';
import PostLoginActions from '@components/common/NavbarButtons/PostLoginActions';

interface AuthActionsProps {
  onLogin: () => void;
  onApply: () => void;
  onResumeApplication: () => void;
}

export default function AuthActions({ onLogin, onApply, onResumeApplication }: AuthActionsProps) {
  const { data: userData } = useUser();

  return (
    <div className={styles.container}>
      {userData?.isloggedIn ? (
        <PostLoginActions
          buttonLabel="Resume Application"
          buttonOnClick={onResumeApplication}
          userName={userData.data.attributes.name}
          data={menuItems}
        />
      ) : (
        <LoginActions
          onLogin={onLogin}
          onApply={onApply}
        />
      )}
    </div>
  );
}