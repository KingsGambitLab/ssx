import type { Metadata } from "next";

import LoginModalProvider from "@context/sst/LoginModalContext";

import { LoginModalWrapper } from "@components/Sst/LoginModalWrapper";

import { METADATA } from "@utils/common/metadata";

import styles from "./layout.module.scss";

export const metadata: Metadata = METADATA.SST;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.sstContainer}>
      <LoginModalProvider>
        <main>{children}</main>
        <LoginModalWrapper />
      </LoginModalProvider>
    </div>
  );
}
