"use client";

import { useForm } from 'react-hook-form';

import PhoneEmailStep
  from "@modules/sst/application-form/components/PhoneEmailStep";

import { PhoneEmailStepFormData } from "@modules/sst/application-form/types";
import { trackAllFormFields } from "@modules/sst/application-form/utils/tracking";

import styles from "./LoginForm.module.scss";
import { useEffect } from 'react';

export default function LoginForm() {
  const {
    register: phoneEmailRegister,
    handleSubmit: handlePhoneEmailSubmit,
    formState: { errors: phoneEmailErrors },
    setError: setPhoneEmailErrors,
    clearErrors: clearPhoneEmailErrors,
    control
  } = useForm<PhoneEmailStepFormData>({
    mode: 'onChange',
    defaultValues: {
      country_code: '+91',
      whatsapp_consent: true,
    }
  })

  const onPhoneEmailSubmit = (data: PhoneEmailStepFormData) => {
    console.log("data", data);
  }

  useEffect(() => {
    trackAllFormFields('phone-email-form');
  }, []);

  return (
    <div className={styles.container}>
      <PhoneEmailStep
        register={phoneEmailRegister}
        onSubmit={onPhoneEmailSubmit}
        errors={phoneEmailErrors}
        setError={setPhoneEmailErrors}
        clearErrors={clearPhoneEmailErrors}
        handleSubmit={handlePhoneEmailSubmit}
        control={control}
      />
    </div>
  );
}
