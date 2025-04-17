
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

import ExperimentsProvider from '@context/ExperimentContext';
import QueryProvider from '@components/common/Analytics/QueryProvider';

import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const experiments = await getAllExperiments();
  
  return (
    <html lang="en" className={fontVariables}>
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
