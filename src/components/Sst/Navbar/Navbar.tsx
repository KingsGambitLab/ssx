"use client";

import { Navbar } from "@components/common";
import AuthActions from "@components/Sst/Navbar/ActionButtons";

import SSTLogo from "@public/images/sst/webp/logo.webp";

import { loggedOutNavItems, loggedInNavItems } from "./data";
import { useLoginModalContext } from "@context/sst/LoginModalContext";

export default function SstNavbar() {
  const { setIsLoginModalOpen } = useLoginModalContext();

  const onLoginHandler = () => {
    setIsLoginModalOpen(true);
  };

  const onApplyHandler = () => {
    setIsLoginModalOpen(true);
  };

  const onResumeApplicationHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  };

  return (
    <div>
      <Navbar
        logoSrc={SSTLogo?.src}
        logoAlt="School of Technology Logo"
        homePageUrl="/school-of-technology"
        loggedOutData={loggedOutNavItems}
        loggedInData={loggedInNavItems}
        actionButtons={
          <AuthActions
            onLogin={onLoginHandler}
            onApply={onApplyHandler}
            onResumeApplication={onResumeApplicationHandler}
          />
        }
      />
    </div>
  );
}
