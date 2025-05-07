'use client';

import React from 'react';
import { Button, Typography } from 'antd';

import Section from '@components/common/Section';
import CommonFaq, { FaqItem } from '@components/common/Faq';

import {
  trackEvent,
  pageTrackingEvents,
  pageTrackingSources,
} from '@modules/sst/degree/utils/tracking';

import styles from './Faq.module.scss';

const { Text, Link } = Typography;

interface SstFaqProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  contactText?: string;
  contactLink?: string;
  contactUrl?: string;
  faqsUrl?: string;
  className?: string;
  showFooter?: boolean;
  sectionClass?: string;
}

const SstFaq: React.FC<SstFaqProps> = ({
  title = "FAQS",
  subtitle = "Frequently Asked Questions",
  items,
  contactText = "Have more questions?",
  contactLink = "Contact Us",
  contactUrl = "mailto:admissions_sst@scaler.com",
  faqsUrl = "/school-of-technology/faq/",
  className = "",
  showFooter = true,
  sectionClass = "",
}) => {
  const renderFooter = () => {
    if (!showFooter) return null;
    
    return (
      <div className={styles.faqFooter}>
        <Button
          type="link"
          href={faqsUrl}
          target="_blank"
          onClick={() => {
            trackEvent.click({
              clickType: pageTrackingEvents.ReadAllFaqs,
              clickSource: pageTrackingSources.Faq,
              custom: {
                link: faqsUrl,
              }
            });
          }}
          className={styles.readAllButton}
        >
          Read all FAQs
        </Button>
        {contactText && contactLink && (
          <div className={styles.contactContainer}>
            <Text className={styles.contactText}>{contactText}</Text>{' '}
            <Link href={contactUrl} className={styles.contactLink} onClick={() => {
              trackEvent.click({
                clickText: pageTrackingEvents.ContactUs,
                clickSource: pageTrackingSources.Faq,
                custom: {
                  link: contactUrl,
                }
              });
            }}>
              {contactLink}
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <Section section_class={`${styles.faqSection} ${sectionClass}`} id="faqs">
      <CommonFaq
        title={title}
        subtitle={subtitle}
        items={items}
        className={`${styles.sstFaq} ${className}`}
        footer={renderFooter()}
      />
    </Section>
  );
};

export default SstFaq;
