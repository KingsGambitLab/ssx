import { Suspense } from 'react';

import { ABEX_FLAG_CONFIG } from '@utils/abex/constants';

import {
  Analytics,
  AnalyticsFallback,
  MicrosoftClarity,
} from '@/components/common/Analytics';
import {
  PRODUCTS,
  SUB_PRODUCTS,
} from '@/components/common/Analytics/constants';

import BottomNavbar from '@components/Sst/BottomNavbar';
import { getAllExperiments } from '@utils/abex/experiment';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const experiments = await getAllExperiments();

  return (
    <>
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
