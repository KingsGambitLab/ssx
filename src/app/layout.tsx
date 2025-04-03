import { ConfigProvider } from 'antd';

import { fontVariables } from '@lib/fonts';
import { customTheme } from '@hooks/useDeviceType';

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <ConfigProvider theme={customTheme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
