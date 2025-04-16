
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ToastContainer } from 'react-toastify';

import { customTheme } from '@hooks/useDeviceType';
import { fontVariables } from '@lib/fonts';
import { getAllExperiments } from '@utils/abex/experiment';

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
            </ExperimentsProvider>  
          </ConfigProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
