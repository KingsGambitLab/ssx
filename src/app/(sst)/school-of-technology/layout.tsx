import { Suspense } from "react";
import type { Metadata } from "next";

import { AnnouncementStrip, Header } from "@components/common";
import { Navbar } from "@components/Sst";
import { AlumniProvider } from "@modules/sst/alumni-directory/context/AlumniContext";
import LoginModalProvider from "@context/LoginModalContext";
import SstBottomNavbar from "@components/Sst/BottomNavbar";

import { METADATA } from "@utils/common/metadata";
import { ANNOUNCEMENT_STRIP_CONTENT } from "@utils/sst/constants";

import {
  Analytics,
  AnalyticsFallback,
  MicrosoftClarity,
} from "@/components/common/Analytics";
import {
  PRODUCTS,
  SUB_PRODUCTS,
} from "@/components/common/Analytics/constants";
import { LoginModalWrapper } from "@components/Sst/LoginModalWrapper";

export const metadata: Metadata = METADATA.SST;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AlumniProvider>
      <LoginModalProvider>
        <Header>
          <AnnouncementStrip
            iconSrc={ANNOUNCEMENT_STRIP_CONTENT.iconSrc.src}
            content={ANNOUNCEMENT_STRIP_CONTENT.content}
            highlightText={ANNOUNCEMENT_STRIP_CONTENT.highlightText}
            redirectUrl={ANNOUNCEMENT_STRIP_CONTENT.redirectUrl}
          />
          <Navbar />
        </Header>
        <main>{children}</main>

        <SstBottomNavbar />
        <LoginModalWrapper />
        <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
          <Analytics
            product={PRODUCTS.SCHOOL_OF_TECHNOLOGY}
            subProduct={SUB_PRODUCTS.ALUMNI_DIRECTORY}
          />
          <MicrosoftClarity />
        </Suspense>
      </LoginModalProvider>
    </AlumniProvider>
  );
}
