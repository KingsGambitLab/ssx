'use client';

import { useState } from "react";
import { Button, Drawer } from "antd";
import Image from "next/image";

import classNames from "classnames";

import { navItems, logoImage } from "./data";
import { useDeviceType } from "@/hooks/useDeviceType";

import NavItems from "../NavItems/NavItems";

import styles from './Navbar.module.scss';

import { MenuOutlined } from "@ant-design/icons";

type NavbarProps = {
  className?: string;
  data?: {
    label: string;
    href: string;
    isNew?: boolean;
  }[];
}

export default function Navbar({
  data = navItems,
  className = '',
}: NavbarProps) {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const { isTablet, isMobile } = useDeviceType();

  const applyButtonHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  }

  const loginButtonHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  }

  return (
    <div className={classNames(styles.container, className)} >
      <Image src={logoImage} alt="School of Technology Logo" width={117} height={34}
        className={styles.logoImage} />
      <div className={styles.rightSection}>
        {isTablet || isMobile ? (
          <div className={styles.hamburgerWrapper}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              className={styles.barsMenu}
              onClick={() => setHamburgerMenuOpen(true)}>
            </Button>
            <Drawer
              title={false}
              placement="right"
              open={hamburgerMenuOpen}
              onClose={() => setHamburgerMenuOpen(false)}
            >
              <NavItems
                data={data}
                variant="hamburger"
                applyButtonHandler={applyButtonHandler}
                loginButtonHandler={loginButtonHandler}
              />
            </Drawer>
          </div>
        ) : (
          <NavItems
            data={data}
            applyButtonHandler={applyButtonHandler}
            loginButtonHandler={loginButtonHandler}
          />
        )}
      </div>
    </div>
  )
}