"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useApplicationForm } from '@hooks/useApplicationForm';
import useUser from '@hooks/useUser';

import OtpStep from '@modules/sst/application-form/components/OtpStep';
import PhoneEmailStep from '@modules/sst/application-form/components/PhoneEmailStep';
import WaitlistForm from '@modules/sst/application-form/components/WaitlistForm';
import ApplicationFeesStep from '@modules/sst/application-form/components/ApplicationFeesStep';

import {
  ApplicationFormStep,
  OtpStepFormData,
  PhoneEmailStepFormData,
  WaitlistStepFormData
} from '@modules/sst/application-form/types';

import styles from "./LoginForm.module.scss";


export default function LoginForm() {
  const [step, setStep] = useState<ApplicationFormStep>('application-fees');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { showWaitlistForm } = useApplicationForm();
  const { data: userData } = useUser();
  
  const {
    handleSubmit: handlePhoneEmailSubmit,
    formState: { errors: phoneEmailErrors },
    setError: setPhoneEmailErrors,
    control: phoneEmailControl
  } = useForm<PhoneEmailStepFormData>({
    mode: 'onChange',
    defaultValues: {
      country_code: '+91',
      whatsapp_consent: true,
    }
  })

  const {
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    control: otpControl
  } = useForm<OtpStepFormData>({
    mode: 'onChange',
    defaultValues: {
      otp: '',
    }
  })

  const {
    handleSubmit: handleWaitlistSubmit,
    formState: { errors: waitlistErrors },
    control: waitlistControl
  } = useForm<WaitlistStepFormData>({
    mode: 'onChange',
  })

  const setInitialStep = () => {
    if(userData?.isloggedIn && !showWaitlistForm) {
      setStep('application-fees');
    } else if(userData?.isloggedIn && showWaitlistForm) {
      setStep('waitlist-form');
    } else {
      setStep('phone-email');
    }
  }

  const onPhoneEmailSubmit = (data: PhoneEmailStepFormData) => {
    console.log("onPhoneEmailSubmit data", data);
    setEmail(data.email);
    setPhoneNumber(`${data.country_code}-${data.phone_number}`);
    setStep('otp');
  }

  const handleOtpVerificationSuccess = () => { 
    // Post verification actions
    window.location.reload();
  }

  const handleOtpVerificationError = (error: string) => {
    console.error('Verification failed:', error);
  }

  const handleWaitlistSubmitSuccess = () => {
    setStep('waitlist-form');
  }

  useEffect(() => {
    setInitialStep();
  }, [userData?.isloggedIn, showWaitlistForm]);

  return (
    <div className={styles.container}>
      {step === 'phone-email' && (
        <PhoneEmailStep
          onSubmit={onPhoneEmailSubmit}
          errors={phoneEmailErrors}
          setError={setPhoneEmailErrors}
          handleSubmit={handlePhoneEmailSubmit}
          control={phoneEmailControl}
        />
      )}
      {step === 'otp' && (
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
      )}
      {(step === 'waitlist-form' || showWaitlistForm) && (
        <WaitlistForm
          onSubmitSuccess={handleWaitlistSubmitSuccess}
          errors={waitlistErrors}
          handleSubmit={handleWaitlistSubmit}
          control={waitlistControl}
        />
      )}
      {step === 'application-fees' && (
        <ApplicationFeesStep
          userDetails={[
            {
              label: "Name",
              value: "Aayush"
            },
            {
              label: "Contact Number",
              value: "+91-xxxxxxx017"
            },
            {
              label: "Email",
              value: "Aayush@gmail.com"
            } 
          ]}
        />
      )}
    </div>
  );
}
