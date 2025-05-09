'use client';

import useUser from '@hooks/useUser';
import { menuItems } from './data';
import styles from './AuthActions.module.scss';
import LoginActions from '@components/common/NavbarButtons/LoginActions';
import PostLoginActions from '@components/common/NavbarButtons/PostLoginActions';
import { ExperimentsContext } from '@context/sst';
import { ABEX_FLAG_CONFIG } from '@utils/abex/constants';
import { useContext } from 'react';
interface AuthActionsProps {
  onLogin: () => void;
  onApply: () => void;
  onResumeApplication: () => void;
}

export default function AuthActions({ onLogin, onApply, onResumeApplication }: AuthActionsProps) {
  const { data: userData } = useUser();
  const { experiments } = useContext(ExperimentsContext);
  const isRevamped = experiments[ABEX_FLAG_CONFIG.SST_LP_REVAMP.KEY] === ABEX_FLAG_CONFIG.SST_LP_REVAMP.NEW_VARIANT;

  return (
    <div className={styles.container}>
      {userData?.isloggedIn ? (
        <PostLoginActions
          buttonLabel="Resume Application"
          buttonOnClick={onResumeApplication}
          userName="Neha"
          data={menuItems}
          variant={isRevamped ? 'userProfileIcon' : 'default'}
        />
      ) : (
        <LoginActions
          applyButtonClassName={isRevamped ? styles.revampedApplyButton : undefined}
          onLogin={onLogin}
          onApply={onApply}
        />
      )}
    </div>
  );
}