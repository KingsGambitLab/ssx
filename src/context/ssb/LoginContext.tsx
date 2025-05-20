"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoginContextType {
  formSource: string;
  currentStep: string;
  setCurrentStep: (value: string) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<string>("");
  const formSource = "waitlist_modal";

  const value = {
    formSource,
    currentStep,
    setCurrentStep,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
}
