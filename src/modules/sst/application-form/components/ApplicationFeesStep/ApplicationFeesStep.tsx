import Image from 'next/image';

import Header from '../Header';

import LockIcon from '@public/images/common/svg/lock.svg';

import { ApplicationFeesStepProps } from '../../types';

import styles from './ApplicationFeesStep.module.scss';

export default function ApplicationFeesStep({ userDetails }: ApplicationFeesStepProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            {/* Title Section */}
            <div className={styles.titleWrapper}>
              <div className={styles.title}>Application Fee</div>
              <div className={styles.securePayment}>
                <Image src={LockIcon} alt="secure-payment-icon" height={16} width={16} />
                <div className={styles.securePaymentText}>Secure Payment</div>
              </div>
            </div>

            {/* User Details Section */}
            <div className={styles.userDetailsSection}>
              <div className={styles.userDetailsWrapper}>
                {userDetails?.map((detail) => (
                  <div className={styles.userDetail} key={detail.label}>
                    <div className={styles.userDetailLabel}>{detail.label}</div>
                    <div className={styles.userDetailSeparator}>:</div>
                    <div className={styles.userDetailValue}>{detail.value}</div>
                  </div>
                ))}
              </div>
              <div className={styles.userDetailsSectionSeparator} />
              <div className={styles.invoiceInfo}>
                You will receive invoice on above mentioned details
              </div>
            </div>

            {/* Fees Breakdown Section */}
            <div className={styles.feesBreakdownSection}>
              <div className={styles.feesBreakdownHeading}>
                <div className={styles.feesBreakdownHeadingText}>Fees Breakdown</div>
                <div className={styles.feesBreakdownLine} />
              </div>

              <div className={styles.applicationFees}>
                <div className={styles.applicationFeesTitle}>Application Fee</div>
                <div className={styles.applicationFeesValue}>₹1000.00</div>
              </div>

              {/* Discount Section */}
              <div className={styles.discountSection}>
                <div className={styles.discountSectionTitle}>Discount</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}