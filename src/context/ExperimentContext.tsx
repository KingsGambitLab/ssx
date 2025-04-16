"use client";

import { createContext, useEffect, useState } from "react";
import { setCookie } from "cookies-next";

const COOKIE_EXPIRY_MINUTES = 30;
const EXPERIMENTS_COOKIE = "experiments";

interface ExperimentsContextType {
  experiments: Record<string, string>;
}

export const ExperimentsContext = createContext<ExperimentsContextType>({
  experiments: {},
});

export default function ExperimentsProvider({
  defaultExperiments,
  children,
}: {
  defaultExperiments: Record<string, string>;
  children: React.ReactNode;
}) {
  const [experiments] = useState(defaultExperiments);

  useEffect(() => {
    if (Object.keys(experiments).length > 0) {
      setExperimentsCookie(experiments);
    }
  }, [experiments]);

  if (Object.keys(experiments).length === 0) return null;

  return (
    <ExperimentsContext.Provider value={{ experiments }}>
      {children}
    </ExperimentsContext.Provider>
  );
}

function setExperimentsCookie(experiments: Record<string, string>) {
  setCookie(EXPERIMENTS_COOKIE, createCookieString(experiments), {
    maxAge: getCookieAge(),
    path: "/",
  });
}

function createCookieString(experiments: Record<string, string>) {
  return Object.entries(experiments)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}

function getCookieAge() {
  return COOKIE_EXPIRY_MINUTES * 60;
}
