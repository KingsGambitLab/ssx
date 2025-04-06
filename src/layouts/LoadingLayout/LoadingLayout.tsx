'use client';

import React from 'react';
import classNames from 'classnames';

import LogoSpinner from '@components/common/Loaders/LogoSpinner/LogoSpinner';

import styles from './LoadingLayout.module.scss';

type LoadingLayoutProps = {
  className?: string;
  isFit?: boolean;
  isTransparent?: boolean;
  small?: boolean;
  loaderBorder?: string;
  layoutClassName?: string;
};

function Loader({ small, loaderBorder }: { small: boolean; loaderBorder: string }) {
  return <LogoSpinner small={small} loaderBorder={loaderBorder} />;
}

export default function LoadingLayout({
  className = '',
  isFit = false,
  isTransparent = false,
  small = false,
  loaderBorder = '',
  layoutClassName = ''
}: LoadingLayoutProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={classNames(
          styles.layoutContent,
          styles.layoutContentCentered,
          styles.p10,
          {
            [styles.layoutContentFit]: isFit,
            [styles.layoutContentTransparent]: isTransparent,
          },
          layoutClassName
        )}
      >
        <Loader small={small} loaderBorder={loaderBorder} />
      </div>
    </div>
  );
}
