import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';

import { customTheme } from '@hooks/useDeviceType';
import { fontVariables } from '@lib/fonts';
import QueryProvider from '@components/common/Analytics/QueryProvider';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <QueryProvider>
          <ConfigProvider theme={customTheme}>
            {children}
          </ConfigProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
