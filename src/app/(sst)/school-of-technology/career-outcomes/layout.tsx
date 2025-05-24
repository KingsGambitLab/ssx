import { Suspense } from 'react';

import { Header } from "@components/common";
import Footer from "@components/common/Footer";
import {
  Analytics,
  AnalyticsFallback,
  MicrosoftClarity,
} from '@/components/common/Analytics';
import {
  PRODUCTS,
  SUB_PRODUCTS,
} from '@/components/common/Analytics/constants';

import Navbar from "@components/Sst/Navbar";
import BottomNavbar from "@components/Sst/BottomNavbar";

import { ABEX_FLAG_CONFIG } from "@utils/abex/constants";
import { getAllExperiments } from "@utils/abex/experiment";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const experiments = await getAllExperiments();

  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
        <Analytics
          product={PRODUCTS.SCHOOL_OF_TECHNOLOGY}
          subProduct={SUB_PRODUCTS.CAREER_OUTCOMES}
          experiments={experiments}
        />
        <MicrosoftClarity />
      </Suspense>
      {children}
      <BottomNavbar variant={ABEX_FLAG_CONFIG.SST_LP_REVAMP.NEW_VARIANT} />
    </>
  );
}
