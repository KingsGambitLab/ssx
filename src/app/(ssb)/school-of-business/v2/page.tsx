'use client';

import RegistrationForm from '../../../../modules/ssb/waitlist_form/components/RegistrationForm';
import styles from './styles.module.scss';

export default function SchoolOfBusinessV2() {
  return (
    <div className={styles.root}>
      <RegistrationForm />
    </div>
  );
}

