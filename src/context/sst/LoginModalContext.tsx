"use client";

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";

import { useWaitlistCheck } from "@hooks/useWaitlistCheck";
import {
  trackEvent,
  trackingSources,
} from "@modules/sst/waitlist/utils/tracking";

interface LoginModalContextType {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean, source?: string, ctaText?: string) => void;
  isModalOpen: boolean;
  handleModalClose: () => void;
  showWaitlistModal: boolean;
  setShowWaitlistModal: (value: boolean) => void;
  trackEventSource: string;
  trackEventCtaText: string;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined
);

export default function LoginModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loginModal, setLoginModal] = useState<{
    isOpen: boolean,
    source: string,
    ctaText: string
  }>({ isOpen: false, source: 'waitlist_form', ctaText: '' });

  const { showWaitlistModal, setShowWaitlistModal } = useWaitlistCheck();

  const isModalOpen = useMemo(() => {
   return loginModal.isOpen || showWaitlistModal;
  }, [loginModal.isOpen, showWaitlistModal]);

  useEffect(() => {
    if (isModalOpen) {
      trackEvent.click({
        clickType: 'click',
        clickText: showWaitlistModal ?
          trackingSources.waitlistForm : trackingSources.waitlistLoginMobileForm,
        clickSource: loginModal.source,
        custom: {
          cta_text: loginModal.ctaText,
        },
      });
    }

  }, [isModalOpen])

  const handleModalClose = () => {
    setLoginModal({ isOpen: false, source: loginModal.source, ctaText: loginModal.ctaText });
    setShowWaitlistModal(false);
  };

  const value: LoginModalContextType = {
    isLoginModalOpen: loginModal.isOpen,
    setIsLoginModalOpen: (
      value: boolean,
      source: string = 'waitlist_form',
      ctaText: string = ''
    ) => setLoginModal({ isOpen: value, source, ctaText }),
    trackEventSource: loginModal.source,
    trackEventCtaText: loginModal.ctaText,
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
