import type { Metadata } from "next";

import { Header } from "@components/common";
import Navbar from "@components/Sst/Navbar";
import { LoginModalWrapper } from "@components/Sst/LoginModalWrapper";
import { METADATA } from "@utils/common/metadata";

import LoginModalProvider from "@context/sst/LoginModalContext";

import styles from "./layout.module.scss";

export const metadata: Metadata = METADATA.SST;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.sstContainer}>
      <LoginModalProvider>
        <Header>
          <Navbar />
        </Header>
        <main>{children}</main>
        <LoginModalWrapper />
      </LoginModalProvider>
    </div>
  );
}
