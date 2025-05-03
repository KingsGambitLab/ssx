import Image from 'next/image';

import Adobe from '@public/images/sst/svg/adobelogo.svg';
import Amazon from '@public/images/sst/svg/amazonlogo.svg';
import Google from '@public/images/sst/svg/google.svg';
import Meta from '@public/images/sst/png/meta.png';
import Microsoft from '@public/images/sst/svg/microsoft.svg';
import Paytm from '@public/images/sst/svg/paytm.svg';
import Paypal from '@public/images/sst/svg/paypal.svg';
import Razorpay from '@public/images/sst/svg/razorpay.svg';
import Zomato from '@public/images/sst/svg/zomato.svg';
import Walmart from '@public/images/sst/svg/walmart.svg';
import Flipkart from '@public/images/sst/png/flipkartlogo.png';
import Target from '@public/images/sst/png/target.png';
import ArrowUpRight from '@public/images/sst/svg/arrow-up-right.svg';
import RightLine from '@public/images/sst/svg/right-vector-our-alumini.svg';
import LeftLine from '@public/images/sst/svg/left-vetor-our-alumini.svg';

import Section from '@components/common/Section';

import styles from './ProvenTrackRecord.module.scss';

export default function ProvenTrackRecord() {
  const companies = [
    { src: Adobe, alt: 'Adobe' },
    { src: Flipkart, alt: 'Flipkart' },
    { src: Meta, alt: 'Meta' },
    { src: Amazon, alt: 'Amazon' },
    { src: Paypal, alt: 'PayPal' },
    { src: Target, alt: 'Target' },
    { src: Walmart, alt: 'Walmart' },
    { src: Microsoft, alt: 'Microsoft' },
    { src: Zomato, alt: 'Zomato' },
    { src: Paytm, alt: 'Paytm' },
    { src: Google, alt: 'Google' },
    { src: Razorpay, alt: 'Razorpay' },
  ];

  return (
    <Section section_class={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.subtitle}>EXPERTISE THAT DELIVERS</div>
            <h2 className={styles.title}>Our Proven Track Record</h2>
            <div className={styles.subheadingWrapper}>
              <Image src={LeftLine} alt="" className={styles.leftVector} />
              <div className={styles.subheading}>OUR ALUMNI WORK AT*</div>
              <Image src={LeftLine} alt="" className={styles.rightVector} />
            </div>
          </div>

          <div className={styles.companiesGrid}>
            {companies.map((company, index) => (
              <div key={index} className={styles.logoContainer}>
                <Image
                  src={company.src}
                  alt={company.alt}
                  className={styles.logo}
                  width={145}
                  height={70}
                />
              </div>
            ))}
          </div>

          <div className={styles.otherCompanies}>
            <div className={styles.pill}>
              <span>+1200</span>
              <span>other companies</span>
            </div>
          </div>

          <div className={styles.outcomeText}>
            *Outcomes through our Scaler's Academy & DSML Program
          </div>

          <div className={styles.reportSection}>
            <button className={styles.downloadButton}>
              <span>Download Report</span>
              <Image 
                src={ArrowUpRight} 
                alt="Download"
                width={24}
                height={24}
                className={styles.downloadIcon}
              />
            </button>
            <div className={styles.reportText}>
              Scaler's Online Program Placement Report*
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
