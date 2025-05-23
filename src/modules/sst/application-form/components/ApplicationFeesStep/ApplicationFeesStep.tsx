"use client";

import { useEffect } from 'react';

import { useWorkflowContext } from '@context/sst/WorkflowContext';

import { APPLICATION_PAGE_URL } from '../../utils/constants';
import { ApplicationFeesStepProps } from '../../types';

import PaymentInitial from '../PaymentInitial';
import PaymentFailure from '../PaymentFailure';

export default function ApplicationFeesStep({ userDetails }: ApplicationFeesStepProps) {
  const {
    currentStep,
    paymentPlanId,
    programId,
    paymentStatus,
    setPaymentStatus,
    fetchCurrentWorkflowStep,
    fetchUserCurrentCouponCode,
    fetchAllWorkflowSteps
  } = useWorkflowContext();

  useEffect(() => {
    // Fetch Payment amount if not already fetched
    if (!currentStep?.id) return;

    if (!paymentPlanId) {
      fetchCurrentWorkflowStep(currentStep?.id as number);
    } else if (paymentPlanId && programId) {
      fetchUserCurrentCouponCode();
    }
  }, [currentStep?.id, paymentPlanId, programId]);

  useEffect(() => {
    fetchAllWorkflowSteps();
  }, []);

  const tryAgainHandler = () => {
   setPaymentStatus('initial');
  }

   // if user has completed appplication fees step, then redirect to application page
   if (
    currentStep?.label
    && currentStep?.label !== 'APPLICATION_FEE'
    && currentStep?.label !== 'PERSONAL_DETAILS'
  ) {
    // window.open(APPLICATION_PAGE_URL, '_self');
  }


  if (paymentStatus === 'failed') {
    return <PaymentFailure userDetails={userDetails} tryAgainHandler={tryAgainHandler} />;
  } else if (paymentStatus === 'success') { 
    window.open(APPLICATION_PAGE_URL, '_self');
  } else {
    return <PaymentInitial userDetails={userDetails} />;
  }
}