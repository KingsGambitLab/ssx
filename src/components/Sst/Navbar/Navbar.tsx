"use client"

import { Navbar } from "@components/common";
import AuthActions from "@components/Sst/Navbar/ActionButtons";

import { loggedOutNavItems, loggedInNavItems } from "./data";

import SSTLogo from "@public/images/sst/webp/logo.webp";
import { useState } from "react";

import { useWaitlistCheck } from "@hooks/useWaitlistCheck";
import LoginModal from "@modules/sst/waitlist/ui/LoginModal";

export default function SstNavbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { showWaitlistModal, setShowWaitlistModal } = useWaitlistCheck();

  const onLoginHandler = () => {
    setIsLoginModalOpen(true);
  }

  const onApplyHandler = () => {
    setIsLoginModalOpen(true);
  }

  const onResumeApplicationHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  }

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    setShowWaitlistModal(false);
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
      <LoginModal
        isOpen={isLoginModalOpen || showWaitlistModal}
        onClose={handleModalClose}
        onLoginSuccess={() => setIsLoginModalOpen(false)}
        initialStep={showWaitlistModal ? "WAITLIST" : "LOGIN"}
      />
    </div>
  )
}