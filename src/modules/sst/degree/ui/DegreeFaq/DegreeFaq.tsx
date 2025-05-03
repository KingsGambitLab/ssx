'use client';

import React from 'react';
import SstFaq from '@components/Sst/Faq';
import { FaqItem } from '@components/common/Faq';

const faqItems: FaqItem[] = [
  {
    question: "Is this a Fully-Residential Program?",
    answer: (
      <p>
        Yes. The Computer Science Programme at the Scaler School of Technology is a fully-residential,
        on-campus programme in Bangalore.
      </p>
    ),
  },
  {
    question: "Who can apply for the Scaler School of Technology's UG Programme?",
    answer: (
      <p>
        The program is open to students who have completed their class 12th or are appearing for 12 finals in 2025 and are aged 20 or below.
      </p>
    ),
  },
  {
    question: "What is the selection process for Scaler School of Technology?",
    answer: (
      <p>
        The candidates have to appear for the Scaler National Scholarship and Entrance Test. Those who qualify the test will be eligible for a personal interview round. For complete details click <a href="/school-of-technology/admission/" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
    ),
  },
  {
    question: "Will I be able to pursue a master's degree later, take competitive exams or apply for further education later?",
    answer: (
      <>
        <p>
          Yes, students will be eligible to pursue a master’s degree. The 4-year UG Programme in CS and AI will ensure
          our students get access to the latest curriculum, hands-on experience, and the opportunity to pursue a 1-year
          cumulative industry immersion via internships, entrepreneurship and projects to achieve success in Computer
          Science within India and abroad.
        </p>
        <p>SST graduates will be eligible for:</p>
        <ul>
          <li>Masters outside India via exams like GRE</li>
          <li>Getting a work visa for migrating abroad</li>
          <li>MBA in India and abroad via exams like CAT & GMAT</li>
          <li>Government Jobs like IAS, IPS via exams like UPSC</li>
        </ul>
      </>
    ),
  },
  {
    question: "What is the fee structure of the 4-year programme?",
    answer: (
      <p>
        The complete details on the fee structure including hostel and mess details are available <a href="/school-of-technology/admission/" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
    ),
  },
];

const DegreeFaq: React.FC = () => {
  return (
    <SstFaq 
      items={faqItems}
    />
  );
};

export default DegreeFaq; 