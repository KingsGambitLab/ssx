'use client';

import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import loader from '@public/images/common/loader.svg';

import styles from './LogoSpinner.module.scss';

export type LogoSpinnerProps = {
  className?: string;
  logo?: string;
  small?: boolean;
  loaderBorder?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function LogoSpinner({
  className,
  logo = loader,
  small = false,
  loaderBorder = '',
  ...remainingProps
}: LogoSpinnerProps) {
  return (
    <div
      className={classNames(
        styles.container,
        { [styles.small]: small },
        className
      )}
      {...remainingProps}
    >
      <div className={classNames(styles.spinner, loaderBorder)} />
      <Image className={styles.logo} src={logo} alt="Logo" />
    </div>
  );
}
