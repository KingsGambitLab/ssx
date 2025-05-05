"use client";

import { useContext } from "react";
import { Navbar } from "@components/common";
import AuthActions from "@components/Sst/Navbar/ActionButtons";

import SSTLogo from "@public/images/sst/webp/logo.webp";

import { loggedOutNavItems, loggedInNavItems, revampedLoggedOutNavItems, revampedLoggedInNavItems } from "./data";
import { useLoginModalContext } from "@context/sst/LoginModalContext";
import { ABEX_FLAG_CONFIG } from "@utils/abex/constants";
import { ExperimentsContext } from "@context/sst";

export default function SstNavbar() {
  const { setIsLoginModalOpen } = useLoginModalContext();
  const { experiments } = useContext(ExperimentsContext);
  const isRevamped = experiments[ABEX_FLAG_CONFIG.SST_LP_REVAMP.KEY] === ABEX_FLAG_CONFIG.SST_LP_REVAMP.NEW_VARIANT;

  const onLoginHandler = () => {
    setIsLoginModalOpen(true, 'navbar', 'login');
  };

  const onApplyHandler = () => {
    setIsLoginModalOpen(true, 'navbar', 'apply');
  };

  const onResumeApplicationHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  };

  return (
    <Navbar
      logoSrc={SSTLogo?.src}
      logoAlt="School of Technology Logo"
      homePageUrl="/school-of-technology"
      loggedOutData={isRevamped ? revampedLoggedOutNavItems : loggedOutNavItems}
      loggedInData={isRevamped ? revampedLoggedInNavItems : loggedInNavItems}
      actionButtons={
        <AuthActions
          onLogin={onLoginHandler}
          onApply={onApplyHandler}
          onResumeApplication={onResumeApplicationHandler}
        />
      }
    />
  );
}
