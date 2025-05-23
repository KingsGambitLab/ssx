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

import Footer from "@components/Ssb/Footer";
import Navbar from "@components/Ssb/Navbar";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const experiments = await getAllExperiments();

  return (
    <>
      <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
        <Analytics
          product={PRODUCTS.SCHOOL_OF_BUSINESS}
          subProduct={SUB_PRODUCTS.MINIMAL_LANDING}
          experiments={experiments}
        />
        <MicrosoftClarity />
      </Suspense>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
