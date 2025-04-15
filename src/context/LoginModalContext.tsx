"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

import { useWaitlistCheck } from "@hooks/useWaitlistCheck";
import {
  trackEvent,
  trackingSources,
} from "@modules/sst/waitlist/utils/tracking";

interface LoginModalContextType {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  handleModalClose: () => void;
  showWaitlistModal: boolean;
  setShowWaitlistModal: (value: boolean) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined
);

export default function LoginModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { showWaitlistModal, setShowWaitlistModal } = useWaitlistCheck();

  const isModalOpen = useMemo(() => {
    const shouldOpen = isLoginModalOpen || showWaitlistModal;

    if (shouldOpen) {
      trackEvent.view({
        clickType: "section_view",
        clickText: trackingEvents.waitlistFormView,
        clickSource: showWaitlistModal
          ? trackingSources.waitlistForm
          : trackingSources.waitlistLoginMobileForm,
      });
    }

    return shouldOpen;
  }, [isLoginModalOpen, showWaitlistModal]);

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    setShowWaitlistModal(false);
  };

  const value: LoginModalContextType = {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isModalOpen,
    handleModalClose,
    showWaitlistModal,
    setShowWaitlistModal,
  };

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModalContext() {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error(
      "useLoginModalContext must be used within a LoginModalProvider"
    );
  }
  return context;
}
