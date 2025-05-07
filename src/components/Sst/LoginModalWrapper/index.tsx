"use client";

import { useLoginModalContext } from "@context/sst";

import LoginModal from "@modules/sst/waitlist/ui/LoginModal";

export function LoginModalWrapper() {
  const {
    isModalOpen,
    setIsLoginModalOpen,
    showWaitlistModal,
    setShowWaitlistModal,
    formSource,
  } = useLoginModalContext();

  const handleModalClose = () => {
    setIsLoginModalOpen(false, formSource);
    setShowWaitlistModal(false);
  };

  return (
    <LoginModal
      isOpen={isModalOpen}
      onClose={() => handleModalClose()}
      onLoginSuccess={() => handleModalClose()}
      initialStep={showWaitlistModal ? "WAITLIST" : "LOGIN"}
      formSource={formSource}
    />
  );
}
