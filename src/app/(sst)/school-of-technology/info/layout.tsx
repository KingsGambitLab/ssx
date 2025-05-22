import { Suspense } from "react";

import {
  Analytics,
  AnalyticsFallback,
  MicrosoftClarity,
} from "@/components/common/Analytics";
import {
  PRODUCTS,
  SUB_PRODUCTS,
} from "@/components/common/Analytics/constants";

import { getAllExperiments } from "@utils/abex/experiment";
import FooterSection from "@modules/sst/info/ui/FooterSection";

import { WorkflowContextProvider } from "@context/sst/WorkflowContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const experiments = await getAllExperiments();

  return (
    <>
      <WorkflowContextProvider>
      <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
        <Analytics
          product={PRODUCTS.SCHOOL_OF_TECHNOLOGY}
          subProduct={SUB_PRODUCTS.INFO}
          experiments={experiments}
        />
        <MicrosoftClarity />
        </Suspense>
        {children}
        <FooterSection />
      </WorkflowContextProvider>
    </>
  );
}
