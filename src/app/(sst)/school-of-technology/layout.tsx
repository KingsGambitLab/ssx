import Navbar from '@components/Sst/Navbar';
import Header from '@components/Header/Header';
import { AlumniProvider } from '@modules/sst/alumni-directory/context/AlumniContext';

import scrollImage from '@public/images/sst/svg/scroll-page.svg';

import AnnouncementStrip from '@components/AnnouncementStrip';

export default function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
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
    </AlumniProvider>
  )
}