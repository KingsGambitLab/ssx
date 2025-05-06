"use client";

import React from 'react';
import Image from 'next/image';
import { Card, Row, Col } from 'antd';

import Section from '@components/common/Section';

import { pageTrackingSources, trackEvent } from '@modules/sst/career-outcomes/utils/tracking';

import LeftQuoteIcon from '@public/images/sst/svg/left-quote-mark.svg';
import RightQuoteIcon from '@public/images/sst/svg/right-quote-mark.svg';
import LinkedIcon from '@public/images/sst/svg/linkedin-logo.svg';

import { mentorshipData } from './data';
import styles from './Mentorship.module.scss';


const Mentorship: React.FC = () => {

  const handleOpenLinkedin = () => {
    window.open('https://www.linkedin.com/in/sidhantgoyal94/', '_blank');

    trackEvent.click({
      clickType: 'click',
      clickText: 'Sidhant Goyal',
      clickSource: pageTrackingSources.mentorship,
    });
  }

  return (
    <Section section_class={styles.mentorshipSection} id="mentorship">
      <div className={styles.sectionTitle}>
        <h2>Key Features</h2>
      </div>
      
      <Row gutter={[24, 24]} className={styles.cardsContainer}>
        {mentorshipData.map((item, index) => (
          <Col xs={24} md={12} key={index}>
            <Card className={styles.mentorCard} bordered={true}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div className={styles.investorSection}>
        <Image src={LeftQuoteIcon.src} alt="Left Quote" width={24} height={24} className={styles.leftQuote}/>
        <div className={styles.investorTitle}>
          <span className={styles.highlight}>What</span> Investors Say
        </div>
        <p className={styles.investorQuote}>
          “Here energy at SST was real. The ideas students shared were grounded in real problems, and with the kind of support and ecosystem they have here, they’re definitely on the right track to building things that matter.”
        </p>
        <div className={styles.investorSeparator}/>
        <div className={styles.footer}>
          <div className={styles.footerText}>
            <b>Sidhant Goyal</b> (ex Sequoia Capital, ex McKinsey)
          </div>
          <button className={styles.linkedinButton} onClick={() => handleOpenLinkedin()}>
            <Image src={LinkedIcon.src} alt="LinkedIn Icon" width={32} height={32} className={styles.linkedinIcon}/>
          </button>
        </div>
        <Image src={RightQuoteIcon.src} alt="Right Quote" width={24} height={24} className={styles.rightQuote}/>
      </div>
    </Section>
  );
};

export default Mentorship; 