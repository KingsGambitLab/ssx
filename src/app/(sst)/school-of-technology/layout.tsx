import type { Metadata } from 'next';

import AnnouncementStrip from '@components/AnnouncementStrip';
import Navbar from '@components/Sst/Navbar';
import Header from '@components/Header/Header';

import { AlumniProvider } from '@modules/sst/alumni-directory/context/AlumniContext';
import { SCALER_HOME_URL } from '@modules/sst/alumni-directory/utils/urlHelper';
import scrollImage from '@public/images/sst/svg/scroll-page.svg';
import favicon from '@public/favicon/favicon-sst.ico';
import metaImage from '@public/images/sst/png/sst-meta-image.png'
import { Suspense } from 'react';
import Analytics from '@analytics';
import AnalyticsFallback from '@analytics-fallback';
import MicrosoftClarity from "@microsoft-clarity";

import { getCookie } from 'cookies-next';
import { QueryProvider } from '@queryProvider';

export const metadata: Metadata = {
  metadataBase: new URL(SCALER_HOME_URL),
  title: 'Scaler School of Technology',
  description: 'Scaler School of Technology - Undergraduate Program delivered by 100+ leaders from Google, Microsoft, Uber etc.',
  openGraph: {
    siteName: 'scaler',
    title: 'Scaler School of Technology',
    description: 'Scaler School of Technology - Undergraduate Program delivered by 100+ leaders from Google, Microsoft, Uber etc.',
    url: '/school-of-technology/',
    images: [{
      url: metaImage.src,
    }],
  },
  icons: {
    icon: [
      { url: favicon.src, rel: 'icon' }
    ]
  }
};

export default function Layout(
  { children }:
    { children: React.ReactNode }
) {

  const experimentsCookieValue = getCookie("experiments") as string;
  const experiments = getCurrentExperiments(experimentsCookieValue);

  return (
    <QueryProvider>
      <AlumniProvider>
        <Header>
          <AnnouncementStrip
            iconSrc={scrollImage}
            content="Apply early and avail up to 100% scholarships! Click here to"
            highlightText="Know More"
            redirectUrl="/school-of-technology/admission/#scholarship"
          />
          <Navbar />
        </Header>
        <main>
          {children}
        </main>
        <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
          <Analytics
            product="scaler_school_of_technology"
            subProduct="alumni_directory"
            experiment={experiments}
          />
          <MicrosoftClarity />
        </Suspense>
      </AlumniProvider>
    </QueryProvider>
  )
}

function getCurrentExperiments(
  experimentCookieVal: string,
): Record<string, string> {
  const experiments: Record<string, string> = {};
  if (experimentCookieVal) {
    const experimentsArr = experimentCookieVal.split(";");
    experimentsArr.forEach((experiment) => {
      const [key, val] = experiment.split(":");
      experiments[key] = val;
    });
  }

  return experiments;
}
