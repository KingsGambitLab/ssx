"use client";

import { useContext, useMemo } from "react";

import { ExperimentsContext } from "@context/sst/ExperimentContext";

import { ABEX_FLAG_CONFIG } from "@utils/abex/constants";

import AdmissionStepTimeline from "@modules/sst/info/ui/AdmissionStepTimeline";
import KeyDates from "@modules/sst/info/ui/KeyDates";
import SuccessStories from "@modules/sst/info/ui/SuccessStories";

import { CareerStats } from "@modules/sst/info/ui/CareerStats";

export default function PageLayout() {
  const { experiments } = useContext(ExperimentsContext);
  const { KEY, NEW_VARIANT } = ABEX_FLAG_CONFIG.SST_INFO_PAGE;

  const showVariantV2 = useMemo(
    () => experiments[KEY] === NEW_VARIANT,
    [experiments]
  );

  return (
    showVariantV2 ?
      (
        <>
        <KeyDates />
        <AdmissionStepTimeline />
        <CareerStats />
          <SuccessStories />
          </>
      )
    : (
        <>
        <CareerStats />
        <SuccessStories />
        <KeyDates />
        <AdmissionStepTimeline />
        </>
    )
  )
};
