import { useWorkflowContext } from '@context/sst/WorkflowContext';

import PaymentInitial from '../PaymentInitial';
import PaymentFailure from '../PaymentFailure';

import { APPLICATION_PAGE_URL } from '../../utils/constants';
import { ApplicationFeesStepProps } from '../../types';
import { useEffect } from 'react';

export default function ApplicationFeesStep({ userDetails }: ApplicationFeesStepProps) {
  const {
    currentStep,
    paymentPlanId,
    programId,
    paymentStatus,
    setPaymentStatus,
    fetchCurrentWorkflowStep,
    fetchUserCurrentCouponCode
  } = useWorkflowContext();

  useEffect(() => {
    if (!paymentPlanId) {
      fetchCurrentWorkflowStep(currentStep?.id as number);
    } else if (paymentPlanId && programId) {
      fetchUserCurrentCouponCode();
    }
  }, [currentStep?.id, paymentPlanId, programId]);

  const tryAgainHandler = () => {
   setPaymentStatus('initial');
  }

  if (paymentStatus === 'failed') {
    return <PaymentFailure userDetails={userDetails} tryAgainHandler={tryAgainHandler} />;
  } else if (paymentStatus === 'success') { 
    window.open(APPLICATION_PAGE_URL, '_self');
  } else {
    return <PaymentInitial userDetails={userDetails} />;
  }
}