import Image from 'next/image';

import { Button } from 'antd';
import SadSmileyImg from '@public/images/common/smiley-sad.svg';

import styles from './LoadingErrorFallback.module.scss';

export default function LoadingErrorFallback(
  { className, variant = 'light' }:
    { className?: string, variant?: "light" | "dark" }) {
  return (
    <div className={`${styles.Container} ${className}`} data-variant-theme={variant}>
      <Image
        src={SadSmileyImg}
        alt="sad smiley"
        className={styles.SmileyImg}
      />
      <div className={styles.InfoContainer}>
        <div className={styles.TitleText}>
          Sorry, something went wrong on our end.
        </div>
        <div className={styles.SubTitleText}>
          Please reload the page and try again.
        </div>
      </div>
      <Button
        className={styles.TryBtn}
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
    </div>
  );
}
