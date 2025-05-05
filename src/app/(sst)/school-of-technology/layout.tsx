import type { Metadata } from 'next';

import { Header } from "@components/common";
import Navbar from "@components/Sst/Navbar";
import { LoginModalWrapper } from "@components/Sst/LoginModalWrapper";
import { METADATA } from "@utils/common/metadata";

import LoginModalProvider from "@context/sst/LoginModalContext";
import BottomNavbar from "@components/Sst/BottomNavbar";
import Footer from "@components/common/Footer";

export const metadata: Metadata = METADATA.SST;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LoginModalProvider>
      <Header>
        <Navbar />
      </Header>
      <main>{children}</main>
      <BottomNavbar />
      <Footer />  
      <LoginModalWrapper />
    </LoginModalProvider>
  );
}
