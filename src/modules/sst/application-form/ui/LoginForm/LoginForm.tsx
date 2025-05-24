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
import FormSkeleton from '@modules/sst/application-form/components/FormSkeleton';

import {
  ApplicationFormStep,
  OtpStepFormData,
  PhoneEmailStepFormData,
  WaitlistStepFormData,
} from '@modules/sst/application-form/types';

import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [step, setStep] = useState<ApplicationFormStep>(undefined);

  const { showWaitlistForm } = useApplicationForm();
  const { data: userData, hasFetched } = useUser();

  const { fetchAllWorkflowSteps, currentStep } = useWorkflowContext();

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
    if (!hasFetched) { 
      return;
    }

    if (!userData?.isloggedIn || showWaitlistForm === null ) {
      return;
    }
    if (showWaitlistForm) {
      setStep('waitlist-form');
    } else {
      setStep('application-fees');
    }
  };

  const onPhoneEmailSubmit = useCallback((data: PhoneEmailStepFormData) => {
    setEmail(data.email);
    setPhoneNumber(`${data.country_code}-${data.phone_number}`);
    setStep('otp');
  }, []);
  
  const handleOtpVerificationSuccess = useCallback(() => { 
    window.location.reload();
  }, []);

  const handleWaitlistSubmitSuccess = useCallback(() => {
    setStep('application-fees');
  }, []);


  useEffect(() => {
    setInitialStep();
  }, [userData?.isloggedIn, showWaitlistForm]);

  useEffect(() => {
    if (userData?.isloggedIn) {
      fetchAllWorkflowSteps();
    }
  }, [userData?.isloggedIn]);


  const userInfo = useMemo(() => [
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
            errors={waitlistErrors}
            handleSubmit={handleWaitlistSubmit}
            control={waitlistControl}
            onSubmitSuccess={handleWaitlistSubmitSuccess}
          />
        );
      case 'application-fees':
        return <ApplicationFeesStep userDetails={userInfo} />;
      default:
        return (
          <FormSkeleton />
        );
    }
  };
  
  return (
      <div className={styles.container} id="application-form">
        {renderStep()}
    </div>
  );
}
