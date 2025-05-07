'use client';

import React from 'react';
import SstFaq from '@components/Sst/Faq';
import { FaqItem } from '@components/common/Faq';

const faqItems: FaqItem[] = [
  {
    question: "Will I get the same job opportunities as a BTech graduate from a top college?",
    answer: (
      <p>
        Yes. Recruiters today don’t just look at your degree name — they care about your <b>skills, projects, and internship experience</b>.
        So, most tech jobs need you to just have a “bachelor’s in CS or equivalent” and not specifically a “BTech”. You can check this yourself on the job
        listings on Linkedin, Naukri etc.

        <br />
        <br />
        <p>
          To teach you the right skills, projects and industry experience, SST’s curriculum is reverse-engineered from top tech job requirements and prepares students to stand out on all these fronts. In fact, <b>93%</b> of SST’s founding batch has already
          secured at least <b>one internship</b> offer – just in their <b>2nd year</b> – at companies like <b>Zomato, Swiggy, Pazcare, Freecharge</b> etc with <b>stipends</b> up to <b>INR 1.1 lakh / month</b>
        </p>
      </p>
    ),
  },
  {
    question: "What companies hire SST students?",
    answer: (
      <p>
        SST students have been hired at leading companies like <b>Zomato, Swiggy, Pazcare, Freecharge,</b> and many more.
        The placement team brings in a mix of <b>big tech, high-growth startups, and global firms</b>, and leverages Scaler’s recruiter network of 1200+ hiring partners and 10 years of Scaler’s legacy. <a href="#placement">Click here to know more</a>
      </p>
    ),
  },
  {
    question: "What support will I get for placements?",
    answer: (
      <p>
        Students receive end-to-end support for placements: <b>resume building, mock interviews, career–related mentorship</b> etc. In addition, students get the opportunity for industry immersion and/or internships, build public portfolios, and are evaluated on industry-grade projects—making them job-ready inherently.
      </p>
    ),
  },
  {
    question: "Will I be eligible for MS/MBA/PhD programs in India and abroad?",
    answer: (
      <>
        <p>
          Yes. Since SST students graduate with a <b>UGC-recognized degree</b> (from IIT Madras / BITS Pilani, subject to students meeting necessary
          requirements set by IIT Madras / BITS Pilani, respectively), they shall be eligible for <b>higher education in India and abroad</b>,
          including exams like GATE, GRE, and CAT. However, we suggest students check the specific eligibility requirements of any higher
          studies programs they are interested in. <a href="#higher-studies">Click here to know more</a>
        </p>
      </>
    ),
  },
  {
    question: "How does SST support students aiming for higher studies?",
    answer: (
      <p>
        SST offers guidance on all aspects of the application process: <b>test prep resources, SOP reviews, letters of recommendation,
        and interview prep</b>. Mentors include alumni from top universities like <b>Harvard, MIT, IIMs, ISB etc.</b> <a href="#higher-studies">Click here to know more</a>
      </p>
    ),
  },
  {
    question: "Can I start a startup while studying at SST?",
    answer: (
      <p>
        Yes. SST actively supports student founders through its <b>Innovation Lab</b>. In fact, SST has earmarked an <b>Innovation fund of INR 1 Crore</b>, dedicated to fostering a <b>culture of
        innovation at our Innovation Lab, dedicated to student startups</b>. Additionally, with <b>access to early stage investors and startup mentors</b>, students can pitch their ideas, build products,
        figure out the marketing strategies – all while pursuing their bachelor’s.
      </p>
    ),
  },
  {
    question: "Have any SST students already started companies?",
    answer: (
      <p>
        Yes. SST has already seen startups emerge from its early batches – there are 7+ early-stage student startups so far - within just 1.5 years of SST’s inception.
        <a href="#entrepreneurship-team">Click here to know more</a>
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
