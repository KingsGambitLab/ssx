import Image from "next/image";

import { TabData } from "@components/common/TabLayout/TabLayout";
import PlacementTab from "@modules/sst/career-outcomes/components/PlacementTab";

import ArrowRightUp from "@public/images/common/svg/arrow-up-right.svg";

import CharanjeetImage from "@public/images/sst/webp/success_stories/charanjeet.webp";
import OmImage from "@public/images/sst/webp/success_stories/om.webp";
import ShreshthaImage from "@public/images/sst/webp/success_stories/shreshtha.webp";
import ShivanshImage from "@public/images/sst/webp/success_stories/shivansh.webp";
import VisheshImage from "@public/images/sst/webp/success_stories/vishesh.webp";
import AyaanImage from "@public/images/sst/webp/success_stories/ayaan.webp";

import Leader1 from "@public/images/sst/webp/leaders/leader1.webp";
import Leader2 from "@public/images/sst/webp/leaders/leader2.webp";
import Leader3 from "@public/images/sst/webp/leaders/leader3.webp";
import Leader4 from "@public/images/sst/webp/leaders/leader4.webp";
import Leader5 from "@public/images/sst/webp/leaders/leader5.webp";
import Leader6 from "@public/images/sst/webp/leaders/leader6.webp";
import Leader7 from "@public/images/sst/webp/leaders/leader7.webp";
import Leader8 from "@public/images/sst/webp/leaders/leader8.webp";
import Leader9 from "@public/images/sst/webp/leaders/leader9.webp";
import Leader10 from "@public/images/sst/webp/leaders/leader10.webp";
import Leader11 from "@public/images/sst/webp/leaders/leader11.webp";
import Leader12 from "@public/images/sst/webp/leaders/leader12.webp";
import Leader13 from "@public/images/sst/webp/leaders/leader13.webp";
import Leader14 from "@public/images/sst/webp/leaders/leader14.webp";

import GoogleSwe from "@public/images/sst/webp/job-listings/google-swe.webp";
import GoogleFe from "@public/images/sst/webp/job-listings/google-fe.webp";
import Amazon from "@public/images/sst/webp/job-listings/amazon.webp";
import Microsoft from "@public/images/sst/webp/job-listings/microsoft.webp";
import MasterCard from "@public/images/sst/webp/job-listings/mastercard.webp";
import Oracle from "@public/images/sst/webp/job-listings/oracle.webp";
import Viacom from "@public/images/sst/webp/job-listings/viacom.webp";

type PointData = {
  id: number;
  title: string;
  desc: string;
};

type VideoCard = {
  id: number;
  thumbnail: string;
  title: string;
  desc: string;
  ctaText: string;
  link?: string;
};

type Cta = {
  text: string;
  icon: string;
};

type Image = {
  src: string;
};

type Header = {
  title: string;
  subtitle: string;
};

export const HEADER: Header = {
  title: "Placement = Profile + Access + Eligibility",
  subtitle: "How tech Companies Hire",
};

export type PlacementTabData = {
  badge: string;
  title: string;
  pointers: PointData[];
  header?: string;
  videoCards?: VideoCard[];
  images?: Image[];
  cta: Cta;
};

export const PROFILE_SECTION_DATA: PlacementTabData = {
  badge: "Profile",
  title: "How SST Students Stand Out",
  pointers: [
    {
      id: 0,
      title: "1 Year of Real-World, Industry Immersion in 4 years at SST",
      desc: "(most colleges offer 2-3 months of summer internships at best)"
    },
    {
      id: 1,
      title: "50+ Hands-on Projects: Build an E-Comm, IPL Prediction App",
      desc: "(most colleges have theory-heavy courses with only 1 final year project)"
    },
    {
      id: 2,
      title: "Buzzing Tech Culture",
      desc: "Scholarships recognize ICPC, GSoC etc  (culture absent in most colleges)",
    },
  ],
  videoCards: [
    {
      id: 0,
      thumbnail: CharanjeetImage.src,
      title: "Read Charanjeet's Story",
      desc: "From 'Not So Good' at CS to Cracking an Internship at Swiggy",
      ctaText: "Read full story on LinkedIn",
      link: "https://www.linkedin.com/posts/scaler-school-of-technology_from-not-so-good-at-dsa-to-cracking-an-activity-7271518472801558528-BpJt/"
    },
    {
      id: 1,
      thumbnail: OmImage.src,
      title: "Read Om's Story",
      desc: "Co-founding 'Build-My-Notes' and cracking 2 Internships - all in 2nd year",
      ctaText: "Read full story on LinkedIn",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7295011234104426496/"
    },
    {
      id: 2,
      thumbnail: ShreshthaImage.src,
      title: "Read Shreshtha's Story",
      desc: "Went from having self doubt to cracking a paid intern in just 1.5 years.",
      ctaText: "Read full story on LinkedIn",
      link: "https://www.linkedin.com/posts/scaler-school-of-technology_%F0%9D%97%A6%F0%9D%97%B5%F0%9D%97%B2-%F0%9D%97%AF%F0%9D%97%B2%F0%9D%97%B0%F0%9D%97%AE%F0%9D%97%BA%F0%9D%97%B2-%F0%9D%98%81%F0%9D%97%B5%F0%9D%97%B2-%F0%9D%97%B3%F0%9D%97%B6%F0%9D%97%BF%F0%9D%98%80%F0%9D%98%81-%F0%9D%97%B4%F0%9D%97%B6%F0%9D%97%BF%F0%9D%97%B9-activity-7262411123763621888-isis/"
    },
    {
      id: 3,
      thumbnail: ShivanshImage.src,
      title: "Read Shivansh's Story",
      desc: "Achieving milestones and more in just 2 years.",
      ctaText: "Read full story on LinkedIn",
      link: "https://www.linkedin.com/posts/scaler-school-of-technology_studentsuccess-icpc-competitiveprogramming-activity-7315960835883872257-6_vj/"
    },
    {
      id: 4,
      thumbnail: VisheshImage.src,
      title: "Read Vishesh's Story",
      desc: "From zero programming knowledge to a dev intern at Rocketium.",
      ctaText: "Read full story on LinkedIn",
      link: "https://www.linkedin.com/posts/scaler-school-of-technology_from-zero-programming-knowledge-to-cracking-activity-7298216248440496130-wPNi/"
    },
    {
      id: 5,
      thumbnail: AyaanImage.src,
      title: "Read Ayaan's Story",
      desc: "Built by second year students - Private, fast, AI-powered photo search",
      ctaText: "Read full story on LinkedIn",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7302534874488348672/"
    },
  ],
  cta: {
    text: "Student Directory",
    icon: ArrowRightUp.src,
  },
};

export const ACCESS_SECTION_DATA: PlacementTabData = {
  badge: "Access",
  title: "How SST Opens More Doors",
  pointers: [
    {
      id: 0,
      title: "1200+ Hiring Partners",
      desc: "(Including the likes of Amazon, Google, Microsoft, Flipkart, etc.)",
    },
    {
      id: 1,
      title: "30K+ Strong Alumni Community",
      desc: "(Built over the last 10 years of our journey)",
    },
    {
      id: 2,
      title: "Bangalore Advantage:",
      desc: "Being in the centre of tech world, companies visit SST campus in-person for placement drives",
    },
  ],
  header: "Industry Leaders @SST",
  images: [
    {
      src: Leader1.src,
    },
    {
      src: Leader2.src,
    },
    {
      src: Leader3.src,
    },
    {
      src: Leader4.src,
    },
    {
      src: Leader5.src,
    },
    {
      src: Leader6.src,
    },
    {
      src: Leader7.src,
    },
    {
      src: Leader8.src,
    },
    {
      src: Leader9.src,
    },
    {
      src: Leader10.src,
    },
    {
      src: Leader11.src,
    },
    {
      src: Leader12.src,
    },
    {
      src: Leader13.src,
    },
    {
      src: Leader14.src,
    },
  ],
  cta: {
    text: "Download Brochure",
    icon: ArrowRightUp.src,
  },
};

export const ELIGIBILITY_SECTION_DATA: PlacementTabData = {
  badge: "Profile",
  title: "How SST Students Stand Out",
  pointers: [
    {
      id: 0,
      title: "Bachelor's Degree Recognized by UGC",
      desc: "Click Here For Degree Preview",
    },
    {
      id: 1,
      title:
        "Meets Job Requirements at Top Tech Firms from FAANG to Big Startups",
      desc: `
        SST Students are required to independently apply to any one program:

        BS in Data Science & Applications - Offered by IIT Madras
        BSc (Hons.) in Computer Science - Offered by BITS Pilani

        Note: The IIT Madras and BITS Pilani degree programs are independent of SST. Admission, coursework, and degree conferral are solely at their discretion.
      `,
    },
  ],
  images: [
    {
      src: Amazon.src,
    },
    {
      src: GoogleSwe.src,
    },
    {
      src: Microsoft.src,
    },
    {
      src: MasterCard.src,
    },
    {
      src: Oracle.src,
    },
    {
      src: Viacom.src,
    },
    {
      src: GoogleFe.src,
    },
  ],
  cta: {
    text: "Download Placement Report",
    icon: ArrowRightUp.src,
  },
};

export const TABS_DATA: TabData[] = [
  {
    key: "profile",
    label: "Profile",
    content: (
      <PlacementTab
        badge={PROFILE_SECTION_DATA.badge}
        title={PROFILE_SECTION_DATA.title}
        pointers={PROFILE_SECTION_DATA.pointers}
        videoCards={PROFILE_SECTION_DATA.videoCards}
        cta={PROFILE_SECTION_DATA.cta}
      />
    ),
  },
  {
    key: "access",
    label: "Access",
    content: (
      <PlacementTab
        badge={ACCESS_SECTION_DATA.badge}
        title={ACCESS_SECTION_DATA.title}
        pointers={ACCESS_SECTION_DATA.pointers}
        header={ACCESS_SECTION_DATA.header}
        images={ACCESS_SECTION_DATA.images}
        cta={ACCESS_SECTION_DATA.cta}
      />
    ),
  },
  {
    key: "eligibility",
    label: "Eligibility",
    content: (
      <PlacementTab
        badge={ELIGIBILITY_SECTION_DATA.badge}
        title={ELIGIBILITY_SECTION_DATA.title}
        pointers={ELIGIBILITY_SECTION_DATA.pointers}
        images={ELIGIBILITY_SECTION_DATA.images}
        cta={ELIGIBILITY_SECTION_DATA.cta}
      />
    ),
  },
];
