import {
  PRIVACY_POLICY_LINK,
  TERMS_AND_CONDITIONS_LINK,
} from '@modules/sst/application-form/utils/constants';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.container}>
      By creating an account I have read and agree to
      {' '}
      <a href={TERMS_AND_CONDITIONS_LINK} target="_blank" rel="noopener noreferrer">
        Scaler’s Terms
      </a>
      {' '}
      and
      {' '}
      <a href={PRIVACY_POLICY_LINK} target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </a>
    </div>
  )
}