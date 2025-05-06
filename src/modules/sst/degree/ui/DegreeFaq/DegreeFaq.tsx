"use client";

import React from "react";
import SstFaq from "@components/Sst/Faq";
import { FaqItem } from "@components/common/Faq";

const faqItems: FaqItem[] = [
  {
    question: "Do students at SST receive a UGC-recognized degree?",
    answer: (
      <p>
        Yes. SST students have the opportunity to independently enroll in a
        UGC-recognized off-campus degree program offered by institutions such as
        IIT Madras or BITS Pilani. This ensures full eligibility for higher
        studies, government exams, and employment opportunities that require a
        formal degree.
      </p>
    ),
  },
  {
    question:
      "If SST doesn’t offer its own degree, what exactly does it provide?",
    answer: (
      <p>
        SST provides a full-time, campus-based education, taught by top software
        engineers from the industry. This curriculum is designed to complement
        the IIT Madras / BITS Pilani off-campus degree programs and focuses on
        building real-world tech skills and career readiness.
      </p>
    ),
  },
  {
    question:
      "Why do I need both: SST’s education and an IIT Madras / BITS degree?",
    answer: (
      <p>
        The degree gives you official recognition from the UGC—essential for
        higher studies, government exams, and many job applications. SST’s
        education equips you with real-world skills and career readiness.
        Together, they offer the best of both worlds: formal credibility and
        practical ability, both of which are critical for long-term success in
        tech.
      </p>
    ),
  },
  {
    question:
      "Will managing the parallel degree along with SST’s curriculum be overwhelming?",
    answer: (
      <>
        <p>
          Not at all. The off-campus degree programs from IIT Madras and BITS
          Pilani are self-paced and flexible. SST’s curriculum is thoughtfully
          designed to align with these programs Also, SST’s academic team offers
          guidance and planning support to help students balance both. Past
          cohorts have handled both comfortably with our structure.
        </p>
      </>
    ),
  },
  {
    question:
      "How do I choose between the Why do I need both: SST’s education and an IIT Madras / BITS degree? and BITS degree options?",
    answer: (
      <p>
        Both are excellent academic choices. Once you’ve received a provisional
        admission offer to SST, our program advisors will help you explore which
        degree might better align with your learning style and career goals.
        Keep in mind that admission to these degree programs is handled
        independently by IIT Madras and BITS Pilani.
      </p>
    ),
  },
];

const DegreeFaq: React.FC = () => {
  return <SstFaq items={faqItems} />;
};

export default DegreeFaq;
