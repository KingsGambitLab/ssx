"use client";

import { createContext, useState } from "react";
import ExperimentCookies from "@components/common/ExperimentCookies";

interface ExperimentsContextType {
  experiments: Record<string, string>;
  setExperiments: (experiments: Record<string, string>) => void;
}

export const ExperimentsContext = createContext<ExperimentsContextType>({
  experiments: {},
  setExperiments: () => {},
});

export default function ExperimentsProvider({
  defaultExperiments,
  children,
}: {
  defaultExperiments: Record<string, string>;
  children: React.ReactNode;
}) {
  const [experiments, setExperiments] = useState(defaultExperiments);

  return (
    <ExperimentsContext.Provider value={{ experiments, setExperiments }}>
      <ExperimentCookies />
      {children}
    </ExperimentsContext.Provider>
  );
}

