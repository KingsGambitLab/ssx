import homeInactive from "@public/images/sst/svg/home-inactive.svg";
import hatInactive from "@public/images/sst/svg/hat-inactive.svg";
import buildingInactive from "@public/images/sst/svg/building-inactive.svg";
import usersActive from "@public/images/sst/svg/users-active.svg";

export const BOTTOM_NAVBAR_LINKS = {
  LEFT: [
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
  ],
  RIGHT: [
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
  ],
}