'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { useDeviceType } from '@hooks/useDeviceType';
import useUser from '@hooks/useUser';

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/alumni-directory/utils';

import NavItems from '../NavItems/NavItems';

import styles from './Navbar.module.scss';
import Section from '@components/common/Section';


type NavbarProps = {
  logoSrc: string;
  homePageUrl: string;
  loggedOutData: {
    label: string;
    href: string;
    isNew?: boolean;
  }[];
  loggedInData: {
    label: string;
    href: string;
    isNew?: boolean;
  }[];
  actionButtons: React.ReactNode;
  logoAlt?: string;
  className?: string;
}

export default function Navbar({
  logoSrc,
  homePageUrl,
  loggedOutData,
  loggedInData,
  logoAlt = 'Logo',
  className = '',
  actionButtons,
}: NavbarProps) {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const { isTabletOrMobile } = useDeviceType();
  const { data: userData } = useUser();

  const trackEventHandler = (clickType: string) => {
    trackEvent.click({
      clickType,
      clickText: clickType,
      clickSource: pageTrackingSources.navbar,
    });
  }

  return (
    <Section section_class='navbar' id='navbar'>
      <div className={classNames(styles.container, className)} >
        <Link href={homePageUrl} prefetch={false} onClick={() => trackEventHandler(pageTrackingEvents.navbarLogoClicked)}>
          <Image
          src={logoSrc}
          alt={logoAlt}
          width={117}
          height={34}
          className={styles.logoImage}
        />
        </Link>
        <div className={styles.rightSection}>
          {isTabletOrMobile ? (
            <div className={styles.hamburgerWrapper}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                className={styles.barsMenu}
                onClick={() => {
                  trackEventHandler(pageTrackingEvents.userMenuOpened);
                  setHamburgerMenuOpen(true);
                }}
              />
              <Drawer
                title={false}
                placement="right"
                open={hamburgerMenuOpen}
                rootClassName={styles.hamburgerDrawer}
                onClose={() => {
                  trackEventHandler(pageTrackingEvents.userMenuClosed);
                  setHamburgerMenuOpen(false);
                }}
              >
                <div className={styles.hamburgerMenu}>
                  <NavItems data={userData?.isloggedIn ? loggedInData : loggedOutData} />
                  {actionButtons}
                </div>
              </Drawer>
            </div>
          ) : (
            <>
              <NavItems data={loggedOutData} />
              {actionButtons}
            </>
          )}
        </div>
      </div>
    </Section>
  )
}