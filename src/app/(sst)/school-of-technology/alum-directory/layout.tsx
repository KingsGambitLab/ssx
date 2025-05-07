import { Suspense } from 'react';

import { AlumniProvider } from '@modules/sst/alumni-directory/context/AlumniContext';

import {
  Analytics,
  AnalyticsFallback,
  MicrosoftClarity,
} from '@/components/common/Analytics';
import {
  PRODUCTS,
  SUB_PRODUCTS,
} from '@/components/common/Analytics/constants';

import BottomNavbar from "@components/Sst/BottomNavbar";

import { getAllExperiments } from '@utils/abex/experiment';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const experiments = await getAllExperiments();
  
  return (
    <>
      <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
        <Analytics
          product={PRODUCTS.SCHOOL_OF_TECHNOLOGY}
          subProduct={SUB_PRODUCTS.ALUMNI_DIRECTORY}
          experiments={experiments}
        />
        <MicrosoftClarity />
      </Suspense>
      <AlumniProvider>
        {children}
      </AlumniProvider>
      <BottomNavbar />
    </>
  );
}
