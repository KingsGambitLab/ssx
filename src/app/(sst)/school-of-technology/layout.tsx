import type { Metadata } from 'next';

import { AnnouncementStrip, Header } from '@components/common';
import { Navbar } from '@components/Sst';
import { AlumniProvider } from '@modules/sst/alumni-directory/context/AlumniContext';

import { METADATA } from '@utils/common/metadata';
import { ANNOUNCEMENT_STRIP_CONTENT } from '@utils/sst/constants';


export const metadata: Metadata = METADATA.SST;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AlumniProvider>
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
    </AlumniProvider>
  );
}
