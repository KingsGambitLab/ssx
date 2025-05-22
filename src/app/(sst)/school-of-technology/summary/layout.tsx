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

import { Header } from "@components/common";

import { getAllExperiments } from "@utils/abex/experiment";
import FooterSection from "@modules/sst/info/ui/FooterSection";
import InfoNavbar from "@modules/sst/info/ui/Navbar";

import { WorkflowContextProvider } from "@context/sst/WorkflowContext";
import { KeyDatesProvider } from "@context/sst/KeyDatesContext";

import styles from './layout.module.scss';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const experiments = await getAllExperiments();

  return (
    <div className={styles.container}>
      <Header>
        <InfoNavbar />
      </Header>
      <WorkflowContextProvider>
        <KeyDatesProvider>
          <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
            <Analytics
              product={PRODUCTS.SCHOOL_OF_TECHNOLOGY}
              subProduct={SUB_PRODUCTS.SUMMARY}
              experiments={experiments}
            />
            <MicrosoftClarity />
          </Suspense>
          {children}
          <FooterSection />
        </KeyDatesProvider>
      </WorkflowContextProvider>
    </div>
  );
}
