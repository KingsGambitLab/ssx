import OpenBookIcon from '@public/images/sst/svg/open-book.svg';
import StarBadgeIcon from '@public/images/sst/svg/star-badge.svg';
import RatingIcon from '@public/images/sst/svg/seal-check.svg';
import ShootingStarIcon from '@public/images/sst/svg/shooting-star.svg';
import CertificateIcon from '@public/images/sst/svg/certificate.svg';
import WeekArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/week-article.webp';
import HackerEarthArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/hacker-earth.webp';
import TimesOfIndiaArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/times-of-india.webp';
import FinancialExpressArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/financial-express.webp';
import UgcSection22ArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/ugc-section22.webp';
import UgcWebsiteFaqArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/ugc-website-faq.webp';
import UpscEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/upsc-eligibility.webp';
import CatEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/cat-eligibility.webp';

export const sstVsTraditionalData = [
  {
    variant: 'red',
    icon: OpenBookIcon.src,
    altIcon: "Open Book Icon",
    title: "Why the traditional system is flawed",
    points: [
      {
        heading: "Most B.Tech curriculums were designed decades ago, are outdated and lack faculty with industry experience",
        subHeading: ""
      },
      {
        heading: "As a result, students from even top colleges have to do double-work: ",
        subHeading: [
          "study theoretical concepts to purely pass exams and,",
          "self-study for clearing job interviews, higher studies, and even startup success."
        ]
      }
    ],
    articles: [
      {
        image: WeekArticleImage.src,
        alt: "Engineering News Article"
      },
      {
        image: HackerEarthArticleImage.src,
        alt: "Engineering News Article"
      }
    ]
  },
  {
    variant: 'blue',
    icon: StarBadgeIcon.src,
    altIcon: "Start Badge Icon",
    title: "The Ideal Tech Education - Best of Both Worlds",
    points: [
      {
        heading: "A degree is necessary—but it shouldn’t come at the cost of real learning.",
        subHeading: "Traditional education forces outdated subjects and rigid structures, leaving students unprepared for industry. "
      },
      {
        heading: "Students at SST have the option to explore independent degree programs",
        subHeading: "that align with their academic and career goals while gaining hands-on, modern CS training at SST."
      }
    ],
    articles: [
      {
        image: TimesOfIndiaArticleImage.src,
        alt: "",
        text: "Scaler School of Technology emerges as one of the top computer science colleges in India"
      },
      {
        image: FinancialExpressArticleImage.src,
        alt: "",
        text: "30% of students choose ‘Scaler School of Technology’ over prestigious Indian institutes."
      }
    ]
  }
]

export const keyFeaturesData = [
  {
    icon: CertificateIcon.src,
    altIcon: "Certificate Icon",
    title: "UGC-Recognized Bachelor’s Degree",
    desc: "Recognized by employers, these UGC-approved degrees from BITS Pilani or IIT Madras can be independently pursued by students along their studies at SST.",
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
    icon: ShootingStarIcon.src,
    altIcon: "Shooting Star Icon",
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
      }
    ]
  },
  {
    icon: RatingIcon.src,
    altIcon: "Rating Icon",
    title: "Accepted by Global Universities",
    desc: "Meets eligibility criteria to apply for further studies programs abroad, including MS, MBA, and PhD.",
  }
]