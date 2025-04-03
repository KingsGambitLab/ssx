import Navbar from "@components/Navbar";

import SSTLogo from "@public/images/sst/webp/logo.webp";

import { navItems } from "./data";

import AuthActions from "@components/Sst/Navbar/ActionButtons";

export default function SstNavbar() {
  return (
    <Navbar
      logoSrc={SSTLogo?.src}
      logoAlt="School of Technology Logo"
      homePageUrl="/school-of-technology"
      data={navItems}
      actionButtons={<AuthActions />}
    />
  )
}