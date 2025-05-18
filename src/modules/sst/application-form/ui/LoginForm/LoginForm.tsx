"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import OtpStep from '@modules/sst/application-form/components/OtpStep';
import PhoneEmailStep from '@modules/sst/application-form/components/PhoneEmailStep';
import {
  ApplicationFormStep,
  OtpStepFormData,
  PhoneEmailStepFormData
} from '@modules/sst/application-form/types';
import { trackAllFormFields } from '@modules/sst/application-form/utils/tracking';

import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [step, setStep] = useState<ApplicationFormStep>('PHONE_EMAIL');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
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


  const onPhoneEmailSubmit = (data: PhoneEmailStepFormData) => {
    console.log("onPhoneEmailSubmit data", data);
    setEmail(data.email);
    setPhoneNumber(`${data.country_code} ${data.phone_number}`);
    setStep('OTP');
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
      {step === 'PHONE_EMAIL' && (
        <PhoneEmailStep
          onSubmit={onPhoneEmailSubmit}
          errors={phoneEmailErrors}
          setError={setPhoneEmailErrors}
          handleSubmit={handlePhoneEmailSubmit}
          control={phoneEmailControl}
        />
      )}
      {step === 'OTP' && (
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
    </div>
  );
}
