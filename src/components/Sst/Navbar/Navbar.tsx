'use client';

import { useMemo, useState } from "react";

import { Navbar } from "@components/common";
import AuthActions from "@components/Sst/Navbar/ActionButtons";

import { useWaitlistCheck } from "@hooks/useWaitlistCheck";

import SSTLogo from "@public/images/sst/webp/logo.webp";

import LoginModal from "@modules/sst/waitlist/ui/LoginModal";
import { trackEvent } from "@modules/sst/waitlist/utils/tracking";
import { trackingSources } from "@modules/sst/waitlist/utils/tracking";

import { loggedOutNavItems, loggedInNavItems } from "./data";


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

  const handleModalOpen = useMemo(() => {
   const shouldOpen = isLoginModalOpen || showWaitlistModal;

    if (shouldOpen) {
      trackEvent.sectionView({
        sectionName: showWaitlistModal ? trackingSources.waitlistForm : trackingSources.waitlistLoginMobileForm
      }) 
    }

    return shouldOpen;
  }, [isLoginModalOpen, showWaitlistModal]);

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
        isOpen={handleModalOpen}
        onClose={handleModalClose}
        onLoginSuccess={() => setIsLoginModalOpen(false)}
        initialStep={showWaitlistModal ? "WAITLIST" : "LOGIN"}
      />
    </div>
  )
}