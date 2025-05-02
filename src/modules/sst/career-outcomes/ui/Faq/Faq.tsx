'use client';

import React from 'react';
import SstFaq from '@components/Sst/Faq';
import { FaqItem } from '@components/common/Faq';

const faqItems: FaqItem[] = [
  {
    question: "Is this a Fully-Residential Program?",
    answer: (
      <p>
        Yes, Scaler School of Technology is a fully residential program located in Bangalore. 
        Students will stay in our campus housing which includes modern amenities, 24/7 security, 
        and a vibrant community environment.
      </p>
    ),
  },
  {
    question: "Who can apply for the Scaler School of Technology's UG Programme?",
    answer: (
      <p>
        Students who have completed or are in the final year of their 12th standard (or equivalent) 
        with Mathematics as a subject are eligible to apply. We look for candidates who demonstrate 
        a passion for technology, problem-solving abilities, and the drive to excel in the field of 
        computer science.
      </p>
    ),
  },
  {
    question: "What is the selection process for Scaler School of Technology?",
    answer: (
      <p>
        Our selection process consists of multiple rounds designed to evaluate a candidate's aptitude, 
        logical reasoning, and problem-solving skills. The process includes an online assessment, 
        followed by interviews with our academic team. We focus on identifying potential rather than 
        just academic scores.
      </p>
    ),
  },
  {
    question: "Will I be able to pursue a master's degree later, take competitive exams or apply for further education later?",
    answer: (
      <>
        <p>
          Yes, students will be eligible to pursue a master's degree. The 4-year UG Programme in CS and AI will ensure our 
          students get access to the latest curriculum, hands-on experience, and the opportunity to pursue a 1-year 
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
        The comprehensive fee covers tuition, accommodation, meals, and access to all campus facilities. 
        We offer various financial aid options, scholarships, and income-sharing agreements to ensure that 
        deserving students can access our program regardless of their financial background. Please contact 
        our admissions team for detailed information.
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
