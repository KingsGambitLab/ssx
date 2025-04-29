
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';

import { customTheme } from '@hooks/useDeviceType';
import { fontVariables } from '@lib/fonts';
import { getAllExperiments } from '@utils/abex/experiment';

import {
  Analytics,
  AnalyticsFallback,
  MicrosoftClarity,
} from '@/components/common/Analytics';
import {
  PRODUCTS,
  SUB_PRODUCTS,
} from '@/components/common/Analytics/constants';

import ExperimentsProvider from '@context/sst/ExperimentContext';
import QueryProvider from '@components/common/Analytics/QueryProvider';

import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const experiments = await getAllExperiments();
  
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <QueryProvider>
          <ConfigProvider theme={customTheme}>
            <ExperimentsProvider defaultExperiments={experiments}>
              <AntdRegistry>
                {children}
              </AntdRegistry>
              <Suspense key="gtm-script" fallback={<AnalyticsFallback />}>
                <Analytics
                  product={PRODUCTS.SCHOOL_OF_TECHNOLOGY}
                  subProduct={SUB_PRODUCTS.ALUMNI_DIRECTORY}
                  experiments={experiments}
                />
                <MicrosoftClarity />
              </Suspense>
            </ExperimentsProvider>  
          </ConfigProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
