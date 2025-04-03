import Navbar from "@components/Navbar";
import AuthActions from "@components/Sst/Navbar/ActionButtons";

import { navItems } from "./data";

import SSTLogo from "@public/images/sst/webp/logo.webp";

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