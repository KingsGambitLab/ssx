"use client"

import { useState } from "react"

export const useLoginModal = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  return {
    isLoginModalOpen,
    setIsLoginModalOpen,
  }
}
