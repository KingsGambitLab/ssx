import Navbar from '@/common/components/Sst/Navbar/Navbar';
import Header from '@/common/components/Header/Header';
import { AlumniProvider } from '@/modules/alumni-directory/context/AlumniContext';
import AnnouncementStrip from '@/common/components/AnnouncementStrip';

export default function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <AlumniProvider>
      <Header>
        <AnnouncementStrip
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