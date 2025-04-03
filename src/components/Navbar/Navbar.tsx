'use client';

import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import { useDeviceType } from "@hooks/useDeviceType";

import NavItems from "../NavItems/NavItems";

import styles from './Navbar.module.scss';

type NavbarProps = {
  logoSrc: string;
  homePageUrl: string;
  data: {
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
  data,
  logoAlt = 'Logo',
  className = '',
  actionButtons,
}: NavbarProps) {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const { isTabletOrMobile } = useDeviceType();

  return (
    <div className={classNames(styles.container, className)} >
      <Link href={homePageUrl} prefetch={false}>
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
              onClick={() => setHamburgerMenuOpen(true)}
            />
            <Drawer
              title={false}
              placement="right"
              open={hamburgerMenuOpen}
              rootClassName={styles.hamburgerDrawer}
              onClose={() => setHamburgerMenuOpen(false)}
            >
              <div className={styles.hamburgerMenu}>
                <NavItems data={data} />
                {actionButtons}
              </div>
            </Drawer>
          </div>
        ) : (
          <>
            <NavItems data={data} />
            {actionButtons}
          </>
        )}
      </div>
    </div>
  )
}