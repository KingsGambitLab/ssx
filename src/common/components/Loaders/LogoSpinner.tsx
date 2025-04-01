'use client';

import Image from 'next/image';

import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './LogoSpinner.module.scss';

import loader from '@/public/loader.svg';

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
