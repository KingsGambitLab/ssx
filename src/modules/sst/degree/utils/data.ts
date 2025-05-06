import { BASE_URL } from '@utils/common/url';

import WeekArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/week-article.webp';
import HackerEarthArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/hacker-earth.webp';
import JobCrisisArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/job-crisis.webp';
import SkillsGapArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/skills-gap.webp';
import HrWorldArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/hr-world.webp';
import UnEmployabilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/unemployability.webp';
import TimesOfIndiaArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/times-of-india.webp';
import FinancialExpressArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/financial-express.webp';
import UgcSection22ArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/ugc-section22.webp';
import UgcWebsiteFaqArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/ugc-website-faq.webp';
import UpscEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/upsc-eligibility.webp';
import CatEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/cat-eligibility.webp';
import GateEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/gate-eligibility.webp';
import GraduateEducationArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/graduate-education.webp';
import DegreeEquivalenceArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/degree-equivalence.webp';
import StandfordEngineeringArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/standford-engineering.webp';

export const sstVsTraditionalData = [
  {
    variant: 'red',
    altIcon: "Open Book Icon",
    title: "Why the traditional system is flawed",
    points: [
      {
        heading: "Most B.Tech curriculums were <b>designed decades ago, are outdated and lack faculty with industry experience</b>.",
        subHeading: ""
      },
      {
        heading: "<b>As a result, students from even top colleges have to do double-work: </b>",
        subHeading: [
          "study theoretical concepts to purely pass exams and,",
          "self-study for clearing job interviews, higher studies, and even startup success."
        ]
      }
    ],
    articles: [
      {
        image: WeekArticleImage.src,
        alt: "Week Article"
      },
      {
        image: HackerEarthArticleImage.src,
        alt: "HackerEarth Article"
      },
      {
        image: JobCrisisArticleImage.src,
        alt: "Job Crisis Article"
      },
      {
        image: SkillsGapArticleImage.src,
        alt: "Skills Gap Article"
      },
      {
        image: HrWorldArticleImage.src,
        alt: "HR World Article"
      },
      {
        image: UnEmployabilityArticleImage.src,
        alt: "Unemployability Article"
      }
    ]
  },
  {
    variant: 'blue',
    altIcon: "Start Badge Icon",
    title: "The Ideal Tech Education - Best of Both Worlds",
    points: [
      {
        heading: "<b>A degree is necessary—but it shouldn’t come at the cost of real learning.</b>",
        subHeading: "Traditional education forces outdated subjects and rigid structures, leaving students unprepared for industry. "
      },
      {
        heading: "<b>Students at SST have the option to explore independent degree programmes</b>",
        subHeading: "that align with their academic and career goals while gaining hands-on, modern CS Education at SST."
      }
    ],
    articles: [
      {
        image: TimesOfIndiaArticleImage.src,
        alt: "Times of India Article",
        text: "Scaler School of Technology emerges as one of the top computer science colleges in India"
      },
      {
        image: FinancialExpressArticleImage.src,
        alt: "Financial Express Article",
        text: "30% of students choose ‘Scaler School of Technology’ over prestigious Indian institutes."
      }
    ]
  }
]

export const keyFeaturesData = {
  features: [
    {
      title: "UGC-Recognized Bachelor’s Degree",
      desc: `Recognized by employers, these UGC-approved degrees from BITS Pilani or IIT Madras can be independently pursued by students along their studies at SST.`,
      featureList: [
        {
          image: UgcSection22ArticleImage.src,
          alt: "UGC Section 22 Article"
        },
        {
          image: UgcWebsiteFaqArticleImage.src,
          alt: "UGC Website FAQ Article"
        }
      ]
    },
    {
      title: "Holds the Same Value as an Offline Degree",
      desc: "Meet eligibility criteria for jobs, UPSC, & further studies (MBA, MS, or PhD).",
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
      title: "Accepted by Global Universities",
      desc: "Meets eligibility criteria to apply for further studies programmes abroad, including MS, MBA, and PhD.",
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
    }
  ],
  cta: {
    title: "Explore Placement @SST",
    link: `${BASE_URL}/school-of-technology/career-outcomes`
  }
}