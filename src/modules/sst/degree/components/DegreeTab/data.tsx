import { JSX } from "react";
import ArrowRightUp from "@public/images/sst/svg/arrow-right-up-grey.svg";
import CertificateBlack from "@public/images/sst/svg/certificate-black.svg";
import FourYearDegreeCardsContainer from "./FourYearDegreeCardsContainer/FourYearDegreeCardsContainer";
import ThreeYearDegreeCardsContainer from "./ThreeYearDegreeCardsContainer/ThreeYearDegreeCardsContainer";

export type DegreeData = {
  src?: string;
  degree: JSX.Element;
  duration?: string;
};

export type FourYearsData = {
  badge: string;
  title: string;
  subtitle: string;
  cardContainer: JSX.Element;
  pointers: JSX.Element;
  ctaText: string;
  ctaIcon: string;
};

export type ThreeYearsData = {
  title: string;
  subtitle: string;
  cardContainer: JSX.Element;
  pointers: JSX.Element;
  ctaText: string;
  ctaIcon: string;
};

const FourYearDegreeData: DegreeData[] = [
  {
    src: CertificateBlack,
    degree: (
      <>
        Bachelor of Science (BS) in Data Science and Applications with{" "}
        <span className="blue">IIT Madras</span>
      </>
    ),
  },
  {
    src: CertificateBlack,
    degree: (
      <>
        Bachelor of Science (BSc Hons.) in Computer Science with{" "}
        <span className="pink">BITS Pilani</span>
      </>
    ),
  },
];

const ThreeYearDegreeData: DegreeData[] = [
  {
    degree: (
      <>
        <span className="blue">IIT Madras</span> - Programming & Data Science
      </>
    ),
    duration: "3 YEARS",
  },
  {
    degree: (
      <>
        MS in Computer Science from <span className="pink">Woolf</span>
      </>
    ),
    duration: "1 YEAR",
  },
  {
    degree: (
      <>
        <span className="pink">BITS Pilani</span> - Programming & Data Science
      </>
    ),
    duration: "3 YEARS",
  },
  {
    degree: (
      <>
        MS in Computer Science from <span className="pink">Woolf</span>
      </>
    ),
    duration: "1 YEAR",
  },
];

export const FourYearsData: FourYearsData = {
  badge: "Newly Added",
  title: "4 YEARS PROGRAMS",
  subtitle: "Bachelor's degree we recommend our students to pursue in parallel",
  cardContainer: (
    <FourYearDegreeCardsContainer degreeData={FourYearDegreeData} />
  ),
  pointers: (
    <ul>
      <li>
        Unlock stellar placement opportunities and higher studies options with a
        dual degree.
      </li>
      <li>Earn Certification in CS & AI from Scaler School of Technology.</li>
    </ul>
  ),
  ctaText: "Know More",
  ctaIcon: ArrowRightUp,
};

export const ThreeYearsData: ThreeYearsData = {
  title: "3+1 YEARS PROGRAMS",
  subtitle: "Bachelor's degree we recommend our students to pursue in parallel",
  cardContainer: (
    <ThreeYearDegreeCardsContainer degreeData={ThreeYearDegreeData} />
  ),
  pointers: (
    <ul>
      <li>
        Unlock stellar placement opportunities and higher studies options with a
        dual degree.
      </li>
      <li>Earn Certification in CS & AI from Scaler School of Technology.</li>
    </ul>
  ),
  ctaText: "Know More",
  ctaIcon: ArrowRightUp,
};
