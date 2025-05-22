"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UpcomingIntakeDetailsData } from "@modules/sst/info/types";
import { getUpcomingIntakeDetailsData } from "@modules/sst/info/api";

interface KeyDatesContextType {
  upcomingIntakeDetails: UpcomingIntakeDetailsData | null;
  isLoading: boolean;
  error: Error | null;
}

const KeyDatesContext = createContext<KeyDatesContextType | undefined>(undefined);

export function KeyDatesProvider({ children }: { children: React.ReactNode }) {
  const [upcomingIntakeDetails, setUpcomingIntakeDetails] = useState<UpcomingIntakeDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUpcomingIntakeDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getUpcomingIntakeDetailsData();
        setUpcomingIntakeDetails(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch key dates'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingIntakeDetails();
  }, []);

  const value = {
    upcomingIntakeDetails,
    isLoading,
    error
  };

  return (
    <KeyDatesContext.Provider value={value}>
      {children}
    </KeyDatesContext.Provider>
  );
}

export function useKeyDates() {
  const context = useContext(KeyDatesContext);
  if (context === undefined) {
    throw new Error('useKeyDates must be used within a KeyDatesProvider');
  }
  return context;
} 