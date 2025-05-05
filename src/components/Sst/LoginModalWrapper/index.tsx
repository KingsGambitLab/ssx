"use client";

import { useLoginModalContext } from "@context/sst";

import LoginModal from "@modules/sst/waitlist/ui/LoginModal";

export function LoginModalWrapper() {
  const {
    isModalOpen,
    setIsLoginModalOpen,
    showWaitlistModal,
    setShowWaitlistModal,
    trackEventSource,
    trackEventCtaText,
  } = useLoginModalContext();

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    setShowWaitlistModal(false);
  };

  return (
    <LoginModal
      isOpen={isModalOpen}
      onClose={handleModalClose}
      onLoginSuccess={handleModalClose}
      initialStep={showWaitlistModal ? "WAITLIST" : "LOGIN"}
      trackEventClickSource={trackEventSource}
      trackEventCtaText={trackEventCtaText}
    />
  );
}
