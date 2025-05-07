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
  formSource: string;
  currentStep: string;
  setCurrentStep: (value: string) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined
);

export default function LoginModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loginModal, setLoginModal] = useState<
    {
      isOpen: boolean,
      source: string,
    }>({ isOpen: false, source: 'waitlist_modal' });

  const [currentStep, setCurrentStep] = useState<string>('');

  const { showWaitlistModal, setShowWaitlistModal } = useWaitlistCheck();

  const isModalOpen = useMemo(() => {
   return loginModal.isOpen || showWaitlistModal;
  }, [loginModal.isOpen, showWaitlistModal]);

  const getFormType = (currentStep: string) => {
    if (currentStep === 'LOGIN') return trackingSources.waitlistLoginMobileForm;
    if (currentStep === 'OTP') return trackingSources.waitlistLoginOTPForm;
    if (currentStep) return trackingSources.waitlistForm;
    return showWaitlistModal
      ? trackingSources.waitlistForm
      : trackingSources.waitlistLoginMobileForm;
  };  

  useEffect(() => {
    if (isModalOpen) {
      trackEvent.click({
        clickType: 'click',
        clickText: "modal_open",
        clickSource: "waitlist_modal",
        custom: {
          form_source: loginModal.source,
          form_type: getFormType(currentStep)
        },
      });
    }

  }, [isModalOpen])

  const handleModalClose = () => {
    setLoginModal({ isOpen: false, source: loginModal.source });
    setShowWaitlistModal(false);
  };

  const value: LoginModalContextType = {
    isLoginModalOpen: loginModal.isOpen,
    setIsLoginModalOpen: (
      value: boolean,
      source: string = 'waitlist_form',
    ) => setLoginModal({ isOpen: value, source }),
    formSource: loginModal.source,
    isModalOpen,
    handleModalClose,
    showWaitlistModal,
    setShowWaitlistModal,
    currentStep,
    setCurrentStep,
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
