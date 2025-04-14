"use client"

import { Navbar } from "@components/common";
import AuthActions from "@components/Sst/Navbar/ActionButtons";

import { loggedOutNavItems, loggedInNavItems } from "./data";

import SSTLogo from "@public/images/sst/webp/logo.webp";
import { useState } from "react";

import { useWaitlistCheck } from "@hooks/useWaitlistCheck";
import LoginModal from "@modules/sst/waitlist/ui/LoginModal";
import { trackEvent, trackingEvents, trackingSources } from "@modules/sst/waitlist/utils/tracking";


export default function SstNavbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { showWaitlistModal, setShowWaitlistModal } = useWaitlistCheck();

  const trackEventHandler = (custom: object) => {
    trackEvent.click({
      clickType: 'click',
      clickText: trackingEvents.waitlistFormView,
      clickSource: trackingSources.waitlistModal,
      custom: custom,
    })
  }

  const onLoginHandler = () => {
    if (!showWaitlistModal) {
      setIsLoginModalOpen(true);
    }
    trackEventHandler({ form_type: showWaitlistModal ? "WAITLIST" : "LOGIN" });
  }

  const onApplyHandler = () => {
    if (!showWaitlistModal) {
      setIsLoginModalOpen(true);
    }
    trackEventHandler({ form_type: showWaitlistModal ? "WAITLIST" : "LOGIN" });
  }

  const onResumeApplicationHandler = () => {
    window.open("/school-of-technology/application", "_blank");
  }

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    setShowWaitlistModal(false);
    trackEvent.click({
      clickType: 'click',
      clickText: trackingEvents.waitlistModalClose,
      clickSource: trackingSources.waitlistModal,
    })
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