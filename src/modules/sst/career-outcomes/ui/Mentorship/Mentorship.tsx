import React from 'react';
import { Card, Row, Col } from 'antd';
import Section from '@components/common/Section';
import Image from 'next/image';
import styles from './Mentorship.module.scss';
import { mentorshipData } from './data';
import CompaniesIcon from '@public/images/sst/svg/career_outcomes/mentorship/companies.svg';

const Mentorship: React.FC = () => {
  return (
    <Section section_class={styles.mentorshipSection} id="mentorship">
      <div className={styles.sectionTitle}>
        <h2>Industry Mentorship & Collaboration</h2>
      </div>
      
      <Row gutter={[24, 24]} className={styles.cardsContainer}>
        {mentorshipData.map((item, index) => (
          <Col xs={24} md={12} key={index}>
            <Card className={styles.mentorCard} bordered={true}>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <Image 
                    src={item.icon} 
                    alt={item.title} 
                    width={60} 
                    height={60}
                  />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <p className={styles.cardDescription}>{item.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div className={styles.investorSection}>
        <div className={styles.investorTitle}>
          <span className={styles.highlight}>What</span> Investor Say
        </div>
        <p className={styles.investorQuote}>
          "Here energy at SST was real. The ideas students shared were grounded in real problems, and with the kind of support and ecosystem they have here, they're definitely on the right track to building things that matter."
        </p>
        <div className={styles.companyLogos}>
          <Image 
            src={CompaniesIcon.src}
            alt="Investor companies"
            width={444}
            height={41}
          />
        </div>
      </div>
    </Section>
  );
};

export default Mentorship; 