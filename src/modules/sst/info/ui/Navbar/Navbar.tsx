"use client";

import { Navbar, PostLoginActions } from "@components/common";

import SSTLogo from "@public/images/sst/webp/logo.webp";

import { navItemsData } from "./data";
import styles from "./Navbar.module.scss";

export default function InfoNavbar() {
  const ActionButtons = () => {
    return (
      <PostLoginActions
        ShowResumeApplicationBtn={false}
        variant={'userProfileIcon'}
      />
    )
  }

  return (
    <Navbar
      logoSrc={SSTLogo?.src}
      logoAlt="School of Technology Logo"
      homePageUrl="/school-of-technology"
      loggedOutData={navItemsData}
      loggedInData={navItemsData}
      className={styles.navbar}
      variant="scroll-tabs"
      actionButtons={<ActionButtons />}
    />
  );
}
