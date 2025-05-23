import type { Metadata } from "next";

import LoginProvider from "@context/ssb/LoginContext";

import { METADATA } from "@utils/common/metadata";

export const metadata: Metadata = METADATA.SSB;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LoginProvider>
        {/** Header and Navbar can be added here if needed */}
        {/** <Header><Navbar /></Header> **/}
        <main>{children}</main>
        {/** Footer can be added here if needed */}
      </LoginProvider>
    </div>
  );
}
