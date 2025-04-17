"use client";

import { useLoginModalContext } from "@context/LoginModalContext";

import LoginModal from "@modules/sst/waitlist/ui/LoginModal";

export function LoginModalWrapper() {
  const {
    isModalOpen,
    setIsLoginModalOpen,
    showWaitlistModal,
    setShowWaitlistModal,
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
    />
  );
}
