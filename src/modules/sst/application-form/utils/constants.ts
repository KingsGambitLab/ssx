import { BASE_URL } from "@utils/common/url";

import Bank from '@public/images/sst/svg/bank.svg';
import Money from '@public/images/sst/svg/money-wavy.svg';
import Rocket from '@public/images/sst/svg/rocket-launch.svg';
import ShootingStar from '@public/images/sst/svg/shooting-star-black.svg';

export const TERMS_AND_CONDITIONS_LINK = `${BASE_URL}/terms`;
export const PRIVACY_POLICY_LINK = `${BASE_URL}/privacy`;

export const EngagementStripData = [
  {
    icon: Bank,
    alt: "bank-icon",
    desc: "Last year 93000+ Students applied to SST"
  },
  {
    icon: Money,
    alt: "money-icon",
    desc: "1.13 Lakh / Month - Highest Internship Stipend"
  },
  {
    icon: Rocket,
    alt: "rocket-icon",
    desc: "10+ Startups incubated at Innovation Lab"
  },
  {
    icon: ShootingStar,
    alt: "shooting-star-icon",
    desc: "93% of students received internship in just 1.5 year"
  }
]

export const APPLICATION_FORM_STUDENT_DETAIL_LABEL = 'application_form_student_details';