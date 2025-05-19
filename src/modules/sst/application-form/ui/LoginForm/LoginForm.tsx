"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useApplicationForm } from '@hooks/useApplicationForm';

import OtpStep from '@modules/sst/application-form/components/OtpStep';
import PhoneEmailStep from '@modules/sst/application-form/components/PhoneEmailStep';
import WaitlistForm from '@modules/sst/application-form/components/WaitlistForm';
import {
  ApplicationFormStep,
  OtpStepFormData,
  PhoneEmailStepFormData,
  WaitlistStepFormData
} from '@modules/sst/application-form/types';
import { trackAllFormFields } from '@modules/sst/application-form/utils/tracking';

import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [step, setStep] = useState<ApplicationFormStep>('waitlist-form');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { showWaitlistForm } = useApplicationForm();
  
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
    setError: setWaitlistErrors,
    control: waitlistControl
  } = useForm<WaitlistStepFormData>({
    mode: 'onChange',
  })

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

  useEffect(() => {
    trackAllFormFields('phone-email-form');
  }, []);

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
          onSubmitSuccess={() => {
            console.log("onSubmitSuccess");
          }}
          errors={waitlistErrors}
          setError={setWaitlistErrors}
          handleSubmit={handleWaitlistSubmit}
          control={waitlistControl}
        />
      )
      }
    </div>
  );
}
