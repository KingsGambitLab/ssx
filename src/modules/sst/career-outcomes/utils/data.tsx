import OpenBookIcon from '@public/images/sst/svg/career_outcomes/higher_studies/book-open.svg';
import GlobeIcon from '@public/images/sst/svg/career_outcomes/higher_studies/globe.svg';
import UpscEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/upsc-eligibility.webp';
import CatEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/cat-eligibility.webp';
import GateEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/gate-eligibility.webp';
import GraduateEducationArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/graduate-education.webp';
import DegreeEquivalenceArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/degree-equivalence.webp';
import GraduateProgramEligibilityArticleImage from '@public/images/sst/webp/articles/sst-vs-traditional/graduate-program-eligibility.webp';
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