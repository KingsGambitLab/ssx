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
import BuildmyNotes from '@public/images/sst/webp/startups/build-my-notes.webp';
import Certcy from '@public/images/sst/webp/startups/certcy.webp';
import HealthNivaran from '@public/images/sst/webp/startups/nivaran.webp';
import Triangles from '@public/images/sst/webp/startups/triangles.webp';
import Photosage from '@public/images/sst/webp/startups/photosage.webp';
import Repsai from '@public/images/sst/webp/startups/reps-ai.webp';
import Fortura from '@public/images/sst/webp/startups/fortura.webp';
import Percevia from '@public/images/sst/webp/startups/percevia.webp';
import XrGame from '@public/images/sst/webp/startups/xr-game.webp';
import RajanAnandan from '@public/images/sst/webp/guest-speakers/rajan-anandan.webp';
import NitinVijay from '@public/images/sst/webp/guest-speakers/nitin-vijay.webp';
import JioHotstar from '@public/images/sst/webp/guest-speakers/jio-hotstar.webp';
import BillionDollar from '@public/images/sst/webp/guest-speakers/billion-dollar.webp';
import FounderUdaan from '@public/images/sst/webp/guest-speakers/founder-of-udaan.webp';
import JacobSingh from '@public/images/sst/webp/guest-speakers/jacob-singh.webp';


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

export const StartupsData = {
  title: "Innovation Lab Startups by SST students",
  startups: [
    {
      image: BuildmyNotes,
      name: "BuildmyNotes app",
      desc: "An AI-powered app that transforms your recorded lectures into clear, structured study notes. Making learning faster, easier, and more organised.",
      cta_text: "BuildmyNotes app",
      link: "http://www.buildmynotes.com"
    },
    {
      image: Certcy,
      name: "Certcy",
      desc: "Predicts layoff risks and empowers professionals to pivot fast with AI-driven career guidance and coaching, because no one should face layoffs alone.",
      cta_text: "Certcy",
      link: "https://www.certcy.space/"
    },
    {
      image: HealthNivaran,
      name: "HealthNivaran",
      desc: "Helps patients decode their symptoms, understand lab reports & get mental health insights. Connect with the right doctor at the right time.",
      cta_text: "HealthNivaran",
      link: "https://www.healthnivaran.in/"
    },
    {
      image: Triangles,
      name: "Triangles",
      desc: "Co-founded with a student from Maters Union and backed by Microsoft, a platform helping students discover global opportunities - from hackathons and competitions to vibrant micro-communities.",
      cta_text: "Triangles",
      link: "http://triangles.site/"
    },
    {
      image: Photosage,
      name: "Photosage",
      desc: "A smart image search engine for mobile and laptop. Just describe the photo you need, and it finds it from your gallery. Built especially for content creators who shoot hundreds of images and need fast, accurate searches for editing.",
      cta_text: "Photosage",
      link: "https://photosage.in/"
    },
    {
      image: Repsai,
      name: "Reps-ai",
      desc: "An AI voice agent that identifies and engages gym leads, qualifying them through smart conversations  and helping turn more prospects into members.",
      cta_text: "Reps-ai",
      link: "https://drive.google.com/file/d/14cfXFR6r3wxL8fgA3APrmqdSg-6Cpaar/view"
    },
    {
      image: Fortura,
      name: "Fortura",
      desc: "A next-gen AI-powered finance platform that goes beyond expense tracking. Predicting cash flow risks, cutting unnecessary spending, and automating real-time financial forecasting.",
      cta_text: "Fortura",
      link: "https://drive.google.com/file/d/19xn43DLeHcqsROp75lJ5mKFranrS_uEl/view"
    },
    {
      image: Percevia,
      name: "Percevia",
      desc: "Smart glasses that help the visually impaired navigate. They by detecting objects and delivering real-time audio cues, turning vision into perception.",
      cta_text: "Percevia",
      link: "https://drive.google.com/file/d/1N34QBXZVjXxGhY8Mwq98FL49mPjR2GLw/view"
    },
    {
      image: XrGame,
      name: "XR based game",
      desc: "Building an immersive Meta Quest game with hand tracking, 3D scaling. With a gameplay prototype already in action, they're set to change the way you experience gaming.",
      cta_text: "XR based game",
      link: "https://drive.google.com/file/d/1XlqowSXdixzS_ygbbxNVh2TCgvJF9eWR/view?usp=drivesdk"
    }
  ]
}

export const GuestSpeakersData = {
  title: "learn what they had to say ABOUT SST",
  title_mobile: "Watch these videos to learn what they had to say",
  subTitle: "We invited leading educators to SST",
  subTitle_mobile: "We invited leading educators to SST",
  guestSpeakers: [
    {
      thumbnail: RajanAnandan,
      videoLink: "M7H1SHc1f2Q",
      desc: (
        <p>Building the Future in Tech - <span>Advice from India's Biggest VC Rajan Anandan</span></p>
      )
    },
    {
      thumbnail: NitinVijay,
      videoLink: "TYCT_34lQWI",
      desc: (
        <p>Advice for CSE & AI Aspirants from Real-Life Jeetu Bhaiya - <span>Nitin Vijay Sir(Founder of Motion)</span></p>
      )
    },
    {
      thumbnail: JioHotstar,
      videoLink: "XLHqG3KzJ7Y",
      desc: (
        <p><span>JioHotstar Secrets Revealed</span> For IPL Live Streaming</p>
      )
    },
    {
      thumbnail: BillionDollar,
      videoLink: "27BikkECTd4",
      desc: (
        <p>How This Man From Chennai <span>Made a 1.5 Billion Dollar Company?</span></p>
      )
    },
    {
      thumbnail: FounderUdaan,
      videoLink: "340HnbTZHEw?",
      desc: (
        <p>How 10x Engineers Think & Code ft. <span>Founder of Udaan</span></p>
      )
    },
    {
      thumbnail: JacobSingh,
      videoLink: "CZT-i7SL1s4",
      desc: (
        <p>Supermentor on SST's vision | <span>Jacob Singh, CTO, Alpha Wave Global</span></p>
      )
    }
  ]
}