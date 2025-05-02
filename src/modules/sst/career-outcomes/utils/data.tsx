import BurstBgImage from '@public/images/common/webp/burst-bg.webp';
import OpenBookIcon from '@public/images/sst/svg/career_outcomes/higher_studies/book-open.svg';
import GlobeIcon from '@public/images/sst/svg/career_outcomes/higher_studies/globe.svg';
import UpscEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/upsc-eligibility.webp';
import CatEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/cat-eligibility.webp';
import GateEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/gate-eligibility.webp';
import GraduateEducationArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/graduate-education.webp';
import DegreeEquivalenceArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/degree-equivalence.webp';
import GraduateProgramEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/graduate-program-eligibility.webp';
import NeoSapianThumbnail from '@public/images/sst/webp/neosapian-thumbnail.webp';
import MartinReindl from '@public/images/sst/webp/people/martin-reindl.webp';
import AdhirajArora from '@public/images/sst/webp/people/adhiraj-arora.webp';
import KshitijMishra from '@public/images/sst/webp/people/kshitij-mishra.webp';
import ManmeetSinghAkali from '@public/images/sst/webp/people/manmeet.webp';
import SunilSeetharaman from '@public/images/sst/webp/people/sunil-seetharaman.webp';
import AkhandPratapSingh from '@public/images/sst/webp/people/akhand-pratap.webp';
import AmardeepSaxena from '@public/images/sst/webp/people/amardeep-saxena.webp';
import ShrutiSagar from '@public/images/sst/webp/people/shruti-sagar.webp';

import { HigherStudiesCardProps } from '../types';

export const higherStudiesCardData: HigherStudiesCardProps[] = [
  {
    icon: OpenBookIcon.src,
    alt: "Open Book Icon",
    title: "Eligible Higher Studies Pathways",
    desc: (
        <>
          <p><strong>Competitive Exams Eligibility - India & Abroad</strong></p>
          <p>
            SST students are eligible for GATE, CAT, GRE, GMAT, UPSC and for MS, MTech, PhD abroad.
          </p>
          <p>
            Note: The European Credit Transfer System of the Master’s Woolf Degree allows students to skip any courses
            or carry forward scores for any course completed with Scaler while pursuing higher studies at UK & EU universities.
          </p>
        </>
      ),
      featureList: [
        {
          image: UpscEligibilityArticleImage.src,
          alt: "UPSC Eligibility Article"
        },
        {
          image: CatEligibilityArticleImage.src,
          alt: "CAT Eligibility Article"
        },
        {
          image: GateEligibilityArticleImage.src,
          alt: "GATE Eligibility Article"
        }
      ]
    },
    {
      icon: GlobeIcon.src,
      alt: "Globe Icon",
      title: "Study–Abroad Guidance",
      desc: (
        <>
          <p><strong>Study–Abroad Guidance</strong></p>
          <p>
            1:1 guidance from experts on Applications Review, Statement of Purpose (SOPs), LORs, competitive exams
            like GRE / GMAT etc.
          </p>
        </>
      ),
      featureList: [
        {
          image: GraduateEducationArticleImage.src,
          alt: "Graduate Education Article"
        },
        {
          image: DegreeEquivalenceArticleImage.src,
          alt: "Degree Equivalence Article"
        },
        {
          image: GraduateProgramEligibilityArticleImage.src,
          alt: "Graduate Program Eligibility Article"
        }
      ]
  },
];

export const CareerStatsData = {
  stats: [
    {
      title: "1.13 Lakh / Month",
      desc: "Final-year level offers in 2nd year",
      image: BurstBgImage.src,
      variant: "primary",
      fullWidth: true
    },
    {
      title: "93%",
      desc: "of eligible students have got more than one internship offered – in just their 2nd year",
      variant: "tertiary"
    },
    {
      title: "10+",
      desc: "Startups incubated at Innovation Lab, one featured on Shark Tank",
      variant: "tertiary",
      mobileOnly: true
    },
    {
      title: "100+",
      desc: "Companies registered for Campus Internships",
      variant: "primary"
    }
  ],
  video: {
    thumbnail: NeoSapianThumbnail.src
  }
}

export const EntrepreneurshipTeamData = {
  title: "THE TEAM",
  subTitle: "Office of Entrepreneurship",
  people: [
    {
      image: MartinReindl,
      name: "Martin Reindl",
      prevOrganisation: "Ex Harvard, MIT Solan,",
      currOrganisation: "Oliver Wyman",
    },
    {
      image: AdhirajArora,
      name: "Adhiraj Arora",
      prevOrganisation: "Ex IIT Kanpur, ISB,",
      currOrganisation: "BCG",
    },
    {
      image: KshitijMishra,
      name: "Kshitij Mishra",
      prevOrganisation: "Ex IIIT Hyd,",
      currOrganisation: "Snapdeal",
    },
    {
      image: ManmeetSinghAkali,
      name: "Manmeet Singh Akali",
      prevOrganisation: "Ex-Founder Klarity,",
      currOrganisation: "(Acquired)",
    }
  ]
}


export const CareerOfficersTeamData = {
  title: "THE TEAM",
  subTitle: "Office of Career Services",
  team: [
    {
      image: SunilSeetharaman,
      name: "Sunil Seetharaman",
      prevOrganisation: "Ex ISB, Zomato"
    },
    {
      image: AkhandPratapSingh,
      name: "Akhand Pratap Singh",
      prevOrganisation: "Ex Zomato, Ola"
    },
    {
      image: AmardeepSaxena,
      name: "Amardeep Saxena",
      prevOrganisation: "Ex ISB, Zomato",
      currOrganisation: "HackerRank"
    }
  ]
}

export const EducationTeamData = {
  title: "THE TEAM",
  subTitle: "Office of Further Education",
  team: [
    {
      image: MartinReindl,
      name: "Martin Reindl",
      currOrganisation: "Ex Harvard, MIT Solan,",
      prevOrganisation: "Oliver Wyman",
    },
    {
      image: AdhirajArora,
      name: "Adhiraj Arora",
      currOrganisation: "Ex IIT Kanpur, ISB,",
      prevOrganisation: "BCG",
    },
    {
      image: KshitijMishra,
      name: "Kshitij Mishra",
      currOrganisation: "Ex IIIT Hyd,",
      prevOrganisation: "Snapdeal",
    },
    {
      image: ShrutiSagar,
      name: "Shruti Sagar",
      currOrganisation: "Ex-IIT Kharagpur",
      prevOrganisation: "LEK Consulting",
    }
  ]
}