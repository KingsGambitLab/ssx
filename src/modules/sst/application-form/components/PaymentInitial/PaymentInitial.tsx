import Image from 'next/image';

import { Button, Input, Skeleton } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';

import { useWorkflowContext } from '@context/sst/WorkflowContext';

import Header from '../Header';
import { PaymentInitialProps } from '../../types';

import LockIcon from '@public/images/common/svg/lock.svg';

import FloatingCtaWrapper from '@/components/common/FloatingCtaWrapper/FloatingCtaWrapper';

import styles from './PaymentInitial.module.scss';


export default function PaymentInitial({ userDetails }: PaymentInitialProps) {
  const [referralCode, setReferralCode] = useState<string>('');

  const {
    couponCode,
    isCouponDisabled,
    applicationFeesAmount,
    applyCoupon,
    removeCoupon,
    discountedAmount,
    applyingCoupon,
    startPaymentProcess
  } = useWorkflowContext();

  const handleCouponApply = async () => {
    if (couponCode) {
      setReferralCode('');
      await removeCoupon();
    } else {
      await applyCoupon(referralCode.toUpperCase());
    }
  }

  const convertToIndianNumeration = (amount: number) => {
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    });
  }

  const totalAmount = useMemo(() => {
    return discountedAmount ? discountedAmount : applicationFeesAmount;
  }, [applicationFeesAmount, discountedAmount]);

  const discount = useMemo(() => { 
    if (discountedAmount && applicationFeesAmount) {
      return applicationFeesAmount - discountedAmount;
    }
    return 0;
  }, [applicationFeesAmount, discountedAmount]);

  const handlePaymentProcess = async () => {
    await startPaymentProcess();
  }

  return (
    <div className={styles.container} id="payment-initial">
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
                <div className={styles.applicationFeesValue}>
                  <Skeleton
                    loading={!applicationFeesAmount}
                    active
                    paragraph={false}
                    title={{ width: 80 }}
                    className={styles.formSkeleton}
                  >
                    {applicationFeesAmount ? `₹ ${applicationFeesAmount.toFixed(2)}` : ''}
                  </Skeleton>
                </div>
              </div>


              {/* Discount Section */}
              <div className={styles.discountSection}>
                {discount > 0 && (
                  <div className={styles.discountedPriceWrapper}>
                    <div className={styles.discountedPriceTitle}>Discount</div>
                      <div className={styles.discountedPriceValue}>
                        <Skeleton
                          loading={!discount}
                          active
                          paragraph={false}
                          title={{ width: 80 }}
                          className={styles.formSkeleton}
                        >
                          {discount ? `- ${convertToIndianNumeration(discount)}` : ''}
                        </Skeleton>
                      </div>
                  </div>
                )}
                  {!isCouponDisabled && (
                    <div className={styles.applyCouponWrapper}>
                    <Input
                        value={referralCode}
                        disabled={!!couponCode}
                        placeholder="Referral Code"
                        onChange={(e) => setReferralCode(e.target.value)}
                        className={styles.discountInput}
                      />
                      <Button
                        variant="outlined"
                        className={styles.applyCouponButton}
                        onClick={handleCouponApply}
                        loading={applyingCoupon}
                        style={{ margin: '0' }}
                      >
                        {couponCode ? 'Remove' : 'Apply'}
                      </Button>
                    </div>
                  )}
                </div>
            </div>

            {/* Note Section */}
            <div className={styles.note}>  
             Note: No refund will be given if later found ineligible
            </div>

            {/* Total Amount Section */}
            <div className={styles.totalAmountSection}>
              <div className={styles.totalAmountLabel}>Total</div>
              <div className={styles.totalAmountValue}>
                <Skeleton
                  loading={!totalAmount}
                  active
                  paragraph={false}
                  title={{ width: 80 }}
                  className={styles.formSkeleton}
                >
                  {totalAmount ? `${convertToIndianNumeration(totalAmount)}` : ''}
                </Skeleton>
              </div>
            </div>
            
          </div>
        </div>

        <FloatingCtaWrapper targetId="payment-initial">
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            className={styles.paymentButton}
            onClick={handlePaymentProcess}
            block
          >
            Continue to pay
          </Button>
        </FloatingCtaWrapper>
      </div>
    </div>
  );
}