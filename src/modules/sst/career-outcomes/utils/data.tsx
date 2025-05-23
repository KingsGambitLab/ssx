import { BASE_URL } from '@utils/common/url';

import BurstBgImage from '@public/images/common/webp/burst-bg.webp';
import UpscEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/upsc-eligibility.webp';
import CatEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/cat-eligibility.webp';
import GateEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/gate-eligibility.webp';
import GraduateEducationArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/graduate-education.webp';
import DegreeEquivalenceArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/degree-equivalence.webp';
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
import Neosapiens from '@public/images/sst/webp/success-stories/neosapiens.webp';
import Abhinav from '@public/images/sst/webp/success-stories/abhinav.webp';
import KrishnaPatidar from '@public/images/sst/webp/success-stories/krishna-patidar.webp';
import Sourashish from '@public/images/sst/webp/success-stories/sourashish.webp';
import BhashiniProject from '@public/images/sst/webp/success-stories/bhashini-project.webp';
import StarFourBlue from '@public/images/sst/svg/star-four-blue.svg';
import StandfordEngineeringArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/standford.webp';

import { HigherStudiesCardProps } from '../types';

export const higherStudiesCardData: HigherStudiesCardProps[] = [
  {
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
          image: StandfordEngineeringArticleImage.src,
          alt: "Standford Engineering Article"
        },
        {
          image: DegreeEquivalenceArticleImage.src,
          alt: "Degree Equivalence Article"
        }
      ]
  },
];

export const CareerStatsData = {
  stats: [
    {
      title: "2 Lakh / Month",
      desc: "Highest 2nd Year Internship Stipend",
      image: BurstBgImage.src,
      variant: "primary",
      fullWidth: true
    },
    {
      title: "93%",
      desc: "of eligible students have got atleast one internship offer – in just their 2nd year",
      variant: "tertiary"
    },
    {
      title: "10+",
      desc: "Startups incubated at Innovation Lab, one featured on Shark Tank",
      variant: "tertiary",
      mobileOnly: true
    },
    {
      title: "140+",
      desc: "Companies registered for Campus Internships",
      variant: "primary"
    }
  ],
  video: {
    title: "10+",
    thumbnail: NeoSapianThumbnail.src,
    desc: (
      <>
        Startups incubated at Innovation Lab,<span>one featured on Shark Tank.</span>
      </>
    ),
    buttonText: "Click here to Watch",
    videoId: "gJtS3b5gCuk"
  },
  brochureLink: "https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/109/378/original/SST_digital_brouchure_V3.pdf?1739770123"
}

export const EntrepreneurshipTeamData = {
  title: "THE TEAM",
  subTitle: "Office of Entrepreneurship",
  people: [
    {
      image: MartinReindl,
      name: "Martin Reindl",
      prevOrganisation: "Ex Harvard, MIT Solan, Oliver Wyman",
    },
    {
      image: AdhirajArora,
      name: "Adhiraj Arora",
      prevOrganisation: "Ex IIT Kanpur, ISB, BCG",
    },
    {
      image: KshitijMishra,
      name: "Kshitij Mishra",
      prevOrganisation: "Ex IIIT Hyd, Snapdeal",
    },
    {
      image: ManmeetSinghAkali,
      name: "Manmeet Singh Akali",
      prevOrganisation: "Ex-Founder Klarity, (Acquired)",
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
      prevOrganisation: "Ex FMS Delhi, Twitter, HackerRank"
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
      prevOrganisation: "Ex Harvard, MIT Solan, Oliver Wyman",
    },
    {
      image: AdhirajArora,
      name: "Adhiraj Arora",
      prevOrganisation: "Ex IIT Kanpur, ISB, BCG",
    },
    {
      image: KshitijMishra,
      name: "Kshitij Mishra",
      prevOrganisation: "Ex IIIT Hyd, Snapdeal",
    },
    {
      image: ShrutiSagar,
      name: "Shruti Sagar",
      prevOrganisation: "Ex-IIT Kharagpur, LEK Consulting",
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
      title: "Building the Future in Tech - Advice from India's Biggest VC Rajan Anandan",
      thumbnail: RajanAnandan,
      videoLink: "M7H1SHc1f2Q",
      desc: (
        <p>Building the Future in Tech - <span>Advice from India's Biggest VC Rajan Anandan</span></p>
      )
    },
    {
      title: "Advice for CSE & AI Aspirants from Real-Life Jeetu Bhaiya - Nitin Vijay Sir(Founder of Motion)",
      thumbnail: NitinVijay,
      videoLink: "TYCT_34lQWI",
      desc: (
        <p>Advice for CSE & AI Aspirants from Real-Life Jeetu Bhaiya - <span>Nitin Vijay Sir(Founder of Motion)</span></p>
      )
    },
    {
      title: "JioHotstar Secrets Revealed For IPL Live Streaming",
      thumbnail: JioHotstar,
      videoLink: "XLHqG3KzJ7Y",
      desc: (
        <p><span>JioHotstar Secrets Revealed</span> For IPL Live Streaming</p>
      )
    },
    {
      title: "How This Man From Chennai Made a 1.5 Billion Dollar Company?",
      thumbnail: BillionDollar,
      videoLink: "27BikkECTd4",
      desc: (
        <p>How This Man From Chennai <span>Made a 1.5 Billion Dollar Company?</span></p>
      )
    },
    {
      title: "How 10x Engineers Think & Code ft. Founder of Udaan",
      thumbnail: FounderUdaan,
      videoLink: "340HnbTZHEw?",
      desc: (
        <p>How 10x Engineers Think & Code ft. <span>Founder of Udaan</span></p>
      )
    },
    {
      title: "Supermentor on SST's vision | Jacob Singh, CTO, Alpha Wave Global",
      thumbnail: JacobSingh,
      videoLink: "CZT-i7SL1s4",
      desc: (
        <p>Supermentor on SST's vision | <span>Jacob Singh, CTO, Alpha Wave Global</span></p>
      )
    }
  ]
}

export const SuccessStoriesData = [
  {
    thumbnail: Neosapiens,
    title: "Neosapiens",
    desc: "A startup nurtured at SST’s very own Incubation lab, secures funding at Shark Tank India.",
    videoId: "gJtS3b5gCuk",
    link: "https://www.youtube.com/embed/gJtS3b5gCuk",
    ctaText: "View the full Story"
  },
  {
    thumbnail: KrishnaPatidar,
    title: "Krishna Patidar",
    desc: "SST student Krishna Patidar, cracks prestigious Apple Academy Programme at Bali",
    link: "https://www.linkedin.com/posts/scaler-school-of-technology_dropping-out-from-previous-college-to-apple-activity-7273173538121949185-h7Is",
    ctaText: "View the full Story"
  },
  {
    thumbnail: Abhinav,
    title: "Abhinav",
    desc: "Built an for KONE at a Finland hackathon, interned in a German company and co‑created Triangles and Scaler  Companion—AI now running 90 % of SST interviews",
    videoLink: "https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/122/021/original/abhinav-final_%281%29_%281%29.mp4?1745419215",
    link: "https://www.instagram.com/p/DFnMXLWyJjh/",
    ctaText: "View the full Story"
  },
  {
    thumbnail: Sourashish,
    title: "Sourashish",
    desc: "ICPC Regionals qualifier & Knight on LeetCode, Landed internships at Dukaan, Emergent & Scaler—all in 2024",
    link: "https://www.linkedin.com/posts/sourashis-sarkar-b957a7215_icpc-amritapuri-icpcregionals-activity-7279568408352890880-1Gnc",
    ctaText: "View the full Story"
  },
  {
    thumbnail: BhashiniProject,
    title: "Indias Bhashini Project",
    desc: "Hear our first-year students discuss developing an app for India's Bhashini Project.",
    videoId: "S2A7nck_aU8",
    link: "https://www.youtube.com/embed/S2A7nck_aU8",
    ctaText: "View the full Story"
  }
]

export const OutcomeHeroData = {
  points: [
    {
      icon: StarFourBlue.src,
      text: "Job Prospects"
    },
    {
      icon: StarFourBlue.src,
      text: "Entrepreneurship"
    },
    {
      icon: StarFourBlue.src,
      text: "Higher Studies"
    }
  ]
}

export const DegreePageLink = `${BASE_URL}/school-of-technology/degree`;