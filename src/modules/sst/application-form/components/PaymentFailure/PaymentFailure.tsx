import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import ReloadIcon from '@public/images/common/svg/arrow-counter-clockwise.svg';

import Header from '../Header';

import { PaymentFailureProps } from '../../types';
import FloatingCtaWrapper from '@/components/common/FloatingCtaWrapper/FloatingCtaWrapper';

import styles from './PaymentFailure.module.scss';

export default function PaymentFailure({ userDetails, tryAgainHandler }: PaymentFailureProps) {
  return (
    <div className={styles.container} id="payment-failure">
      <Header />
      <div className={styles.content}> 
        <div className={styles.failureMessageWrapper}>
          <ExclamationCircleOutlined className={styles.failureMessageIcon} />
          <p>Your payment is being processed. Please do not refresh or close this page.</p>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.userInfoWrapper}>
            {userDetails.map((detail) => (
              <div className={styles.userInfoItem}>
                <div className={styles.userInfoLabel}>{detail.label}</div>
                <div className={styles.userInfoSeparator}>:</div>
                <div className={styles.userInfoValue}>{detail.value}</div>
              </div>
            ))}
          </div>

          <div className={styles.infoSeparator} />

          <div className={styles.paymentFailureWrapper}>
            <div className={styles.paymentFailureHeading}>
             Thank you for your payment! Your payment is being processed.
            </div>

            <ul>
              <li>
               If the Application Fee step is not marked completed within 15 minutes, kindly retry the payment
              </li>
              <li>
               If any amount is deducted, rest assured, we will refund it within 5 days
              </li>
            </ul>

            <div>
              We apologize for any inconvenience this may cause and truly appreciate your patience. Our support team is always here to help.
            </div>
          </div>
        </div>

        <FloatingCtaWrapper targetId="payment-failure">
          <Button
            icon={<img src={ReloadIcon.src} alt="reload" />}
            className={styles.tryAgainButton}
            onClick={tryAgainHandler}
            block
          >
            Try Again
          </Button>
        </FloatingCtaWrapper>
      </div>
    </div>
  );
}