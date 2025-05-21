"use client";

import CaseUtil from '@lib/caseUtil';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useWorkflowContext } from '@context/sst/WorkflowContext';

import useUser from '@hooks/useUser';
import { useApplicationForm } from '@hooks/useApplicationForm';

import ApplicationFeesStep from '@modules/sst/application-form/components/ApplicationFeesStep';
import OtpStep from '@modules/sst/application-form/components/OtpStep';
import PhoneEmailStep from '@modules/sst/application-form/components/PhoneEmailStep';
import WaitlistForm from '@modules/sst/application-form/components/WaitlistForm';

import {
  ApplicationFormStep,
  OtpStepFormData,
  PhoneEmailStepFormData,
  WaitlistStepFormData,
} from '@modules/sst/application-form/types';

import { APPLICATION_PAGE_URL } from '@modules/sst/application-form/utils/constants';

import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [step, setStep] = useState<ApplicationFormStep>('phone-email');

  const { showWaitlistForm } = useApplicationForm();
  const { data: userData } = useUser();

  const {
    currentStep,
    fetchAllWorkflowSteps,
    fetchCurrentWorkflowStep,
    fetchUserCurrentCouponCode,
    paymentPlanId,
    programId,
  } = useWorkflowContext();

  const {
    control: phoneEmailControl,
    formState: { errors: phoneEmailErrors },
    handleSubmit: handlePhoneEmailSubmit,
    setError: setPhoneEmailErrors,
  } = useForm<PhoneEmailStepFormData>({
    mode: 'onChange',
    defaultValues: {
      country_code: '+91',
      whatsapp_consent: true,
    },
  });

  const {
    control: otpControl,
    formState: { errors: otpErrors },
    handleSubmit: handleOtpSubmit,
    setError: setOtpErrors,
  } = useForm<OtpStepFormData>({
    mode: 'onChange',
    defaultValues: {
      otp: '',
    },
  });

  const {
    control: waitlistControl,
    formState: { errors: waitlistErrors },
    handleSubmit: handleWaitlistSubmit,
  } = useForm<WaitlistStepFormData>({
    mode: 'onChange',
  });

  const setInitialStep = () => {
    if (!userData?.isloggedIn) {
      return;
    }

    if (userData?.isloggedIn && (showWaitlistForm === null || !currentStep?.label)) { 
      return;
    }

    if(userData?.isloggedIn && (showWaitlistForm || currentStep?.label === 'PERSONAL_DETAILS')) {
      setStep('waitlist-form');
    } else if(userData?.isloggedIn && currentStep?.label === 'APPLICATION_FEE') {
      setStep('application-fees');
    } 
  }

  const onPhoneEmailSubmit = useCallback((data: PhoneEmailStepFormData) => {
    setEmail(data.email);
    setPhoneNumber(`${data.country_code}-${data.phone_number}`);
    setStep('otp');
  }, []);
  
  const handleOtpVerificationSuccess = useCallback(() => { 
    window.location.reload();
  }, []);
  
  const handleOtpVerificationError = useCallback((error: string) => {
    setOtpErrors('otp', { message: error });
  }, [setOtpErrors]);
  
  const handleWaitlistSubmitSuccess = useCallback(() => {
    setStep('application-fees');
  }, []);


  useEffect(() => {
    setInitialStep();
  }, [userData?.isloggedIn, showWaitlistForm, currentStep?.label]);

  useEffect(() => {
    if (!currentStep?.id && userData?.isloggedIn) {
      fetchAllWorkflowSteps();
    } else if (currentStep?.id && !paymentPlanId) {
      fetchCurrentWorkflowStep(currentStep?.id);
    } else if (paymentPlanId && programId) {
      fetchUserCurrentCouponCode();
    }
  }, [currentStep?.id, userData?.isloggedIn, paymentPlanId, programId, step]);

  const userDetails = useMemo(() => [
    {
      label: "Name",
      value: CaseUtil.titleCase(userData?.data?.attributes?.name || '')
    },
    {
      label: "Contact Number",
      value: userData?.data?.attributes?.phoneNumber || '',
    },
    {
      label: "Email",
      value: userData?.data?.attributes?.email || '',
    }
  ], [userData]);  

  const renderStep = () => {
    switch(step) {
      case 'phone-email':
        return (
          <PhoneEmailStep
            onSubmit={onPhoneEmailSubmit}
            errors={phoneEmailErrors}
            setError={setPhoneEmailErrors}
            handleSubmit={handlePhoneEmailSubmit}
            control={phoneEmailControl}
          />
        );
      case 'otp':
        return (
          <OtpStep
            email={email}
            onOtpVerificationSuccess={handleOtpVerificationSuccess}
            onOtpVerificationError={handleOtpVerificationError}
            errors={otpErrors}
            control={otpControl}
            handleSubmit={handleOtpSubmit}
            phoneNumber={phoneNumber}
            setStep={setStep}
          />
        );
      case 'waitlist-form':
        return (
          <WaitlistForm
            onSubmitSuccess={handleWaitlistSubmitSuccess}
            errors={waitlistErrors}
            handleSubmit={handleWaitlistSubmit}
            control={waitlistControl}
          />
        );
      case 'application-fees':
        return <ApplicationFeesStep userDetails={userDetails} />;
      default:
        return null;
    }
  };
  
  return <div className={styles.container}>{renderStep()}</div>;  
}
