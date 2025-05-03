import homeInactive from "@public/images/sst/svg/home-inactive.svg";
import hatInactive from "@public/images/sst/svg/hat-inactive.svg";
import buildingInactive from "@public/images/sst/svg/building-inactive.svg";
import usersActive from "@public/images/sst/svg/users-active.svg";
import darkOutlinedShootingStar from "@public/images/sst/svg/dark-outlined-shooting-star.svg";
import darkOutlinedCertificate from "@public/images/sst/svg/dark-outlined-certificate.svg";

export const BOTTOM_NAVBAR_LINKS = [
  {
    icon: homeInactive,
    text: "Home",
    redirectUrl: '/school-of-technology',
    active: false,
  },
  {
    icon: hatInactive,
    text: "Admission & Fees",
    redirectUrl: '/school-of-technology/admission',
    active: false,
  },
  {
    icon: buildingInactive,
    text: 'Campus Life',
    redirectUrl: '/school-of-technology/campus-life',
    active: false,
  },
  {
    icon: usersActive,
    text: `Our Students`,
    redirectUrl: '/school-of-technology/alum-directory/',
    active: true,
  },
]

export const BOTTOM_NAVBAR_LINKS_REVAMP = [
  {
    icon: homeInactive,
    text: "Home",
    redirectUrl: '/school-of-technology',
    active: false,
  },
  {
    icon: hatInactive,
    text: "Admission & Fees",
    redirectUrl: '/school-of-technology/admission',
    active: false,
  },
  {
    icon: darkOutlinedShootingStar,
    text: 'Careers',
    redirectUrl: '/school-of-technology/career-outcomes',
    active: false,
  },
  {
    icon: darkOutlinedCertificate,
    text: 'Degree',
    redirectUrl: '/school-of-technology/degree/',
    active: true,
  },
]