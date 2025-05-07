"use client";

import React from "react";
import SstFaq from "@components/Sst/Faq";
import { FaqItem } from "@components/common/Faq";

const faqItems: FaqItem[] = [
  {
    question: "Do students at SST receive a UGC-recognized degree?",
    answer: (
      <p>
        Yes. SST students have the opportunity to independently enroll in a UGC-recognized off-campus degree program offered
        by institutions such as IIT Madras or BITS Pilani. This bachelor’s degree hence makes you eligible for higher studies,
        government exams, and job roles, while SST’s education equips you with real-world skills and career readiness. Together,
        they offer the <b>best of both worlds: formal credibility and practical ability</b>, both of which are critical for long-term
        success in tech. <a href="#sst-vs-traditional">Click here to know more.</a>
      </p>
    ),
  },
  {
    question: "Why does SST not give a B.Tech degree?",
    answer: (
      <p>
        Traditional B.Tech programs today face three major challenges – slow curriculum updates, overly theoretical teaching, and minimal industry
        exposure. One of the core reasons SST was created was to break free from these limitations and offer a modern, industry-aligned alternative.
        <br />
        <br />

        So, instead of offering a B.Tech, we’ve deliberately chosen to focus on delivering full-time, practical tech education that’s built for the tech
        industry of today (and tomorrow). Since a formal bachelor’s degree is still essential for higher studies, government exams, and many job applications,
        SST students have the opportunity to independently enroll in UGC-recognized off-campus bachelor’s degree programs from institutions like IIT Madras or BITS Pilani.
        <br />
        <br />

        This way, you graduate with both: a formal degree and real-world skills to thrive in today’s tech industry.
        <a href="https://www.youtube.com/watch?v=mxeKIZEH6V4" target="_blank" rel="noopener noreferrer">Watch this video to know more</a>
      </p>
    ),
  },
  {
    question: "How do I choose between the IIT Madras and BITS Pilani degree options?",
    answer: (
      <p>
        Both are excellent academic choices. Once you’ve received a provisional admission offer to SST, our program advisors will help you explore which degree might better align
        with your learning style and career goals. Keep in mind that admission to these degree programs is handled independently by IIT Madras and BITS Pilani.
      </p>
    ),
  },
  {
    question: "Will managing the parallel degree along with SST’s curriculum be overwhelming?",
    answer: (
      <>
        <p>
          Not at all. The off-campus degree programs from IIT Madras and BITS Pilani are self-paced and flexible. SST’s curriculum is thoughtfully designed to align with these programs Also,
          SST’s academic team offers guidance and planning support to help students balance both. Past cohorts have handled both comfortably with our structure..
        </p>
      </>
    ),
  },
  {
    question: "Is the Masters’ from Woolf globally recognized and valid?",
    answer: (
      <p>
        Yes. The degree of Master of Science in Computer Science from Woolf is a degree conferring 90 ECTS (European Credit Transfer System) credits. ECTS is a globally accepted credit system and
        is recognized in all European countries, UK, USA, Canada etc. <a href="https://woolf.university/" target="_blank" rel="noopener noreferrer">Click here to read more about Woolf</a>
      </p>
    ),
  },
  {
    question: "Will this degree structure make me eligible for jobs at tech companies?",
    answer: (
      <p>
        Yes. The combination of a UGC-recognized off-campus bachelor’s degree (from IIT Madras or BITS Pilani)
        and SST’s full-time, industry-aligned education ensures that students are well-prepared for top-tier tech
        careers. These formal degrees meet eligibility requirements for most job roles as job roles require a
        “bachelor’s in CS or equivalent” and not specifically a “BTech”. You can verify this by going through job postings
        on Linkedin, Naukri etc. SST’s hands-on curriculum equips you with the practical skills, mentorship, and exposure
        needed to thrive in real-world tech environments. So together, they offer both the qualification and the capability
        that tech companies look for. <a href="#key-features">Click here to know more</a>
      </p>
    ),
  },
];

const DegreeFaq: React.FC = () => {
  return <SstFaq items={faqItems} />;
};

export default DegreeFaq;
