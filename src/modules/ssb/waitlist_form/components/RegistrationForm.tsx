import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import OtpVerificationForm from './OtpForm/index';
import PersonalInformationForm from './PersonalInformationForm/index';
import AccountCreationForm from './AccountCreationForm/index';
import { useLoginContext } from '@context/ssb/LoginContext';
import { LoginFormData, OtpFormData, FormStep } from '../types/index';
import { useDeviceType } from '@hooks/useDeviceType';

import DisplayMobileCard from '@modules/ssb/landing_v2/components/DisplayMobileCard';

// Types of form steps
export default function RegistrationForm() {

  const { setCurrentStep: setContextStep } = useLoginContext();
  //Track the current step of the form
  const [currentStep, setCurrentStep] = useState<FormStep>('LOGIN');

  //Track the device type
  const { isTabletOrMobile } = useDeviceType();

  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    setError: setLoginError,
    clearErrors: clearLoginErrors,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      country_code: '+91',
      whatsapp_consent: true,
    }
  });

  // OTP step form management
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    setError: setOtpError,
  } = useForm<OtpFormData>({
    mode: 'onChange',
    defaultValues: {
      otp: ''
    }
  });

  const [userData, setUserData] = useState<LoginFormData>({
    email: '',
    phone_number: '',
    country_code: '+91',
    whatsapp_consent: true
  });

  const handleAccountFormSubmit = (data: LoginFormData) => {
    setUserData({
      email: data.email,
      phone_number: data.phone_number,
      country_code: data.country_code,
      whatsapp_consent: data.whatsapp_consent
    });
    setCurrentStep('OTP');
    setContextStep('OTP');
    console.log('Account Creation Form submitted:', data);
  };


  // Handle OTP verification submission
  const handleOtpFormSubmit = (data: { otp: string }) => {
    setCurrentStep('PERSONAL_DETAILS');
    setContextStep('PERSONAL_DETAILS');
    console.log('OTP submitted:', data.otp);
  };

  const handlePersonalInfoFormSubmit = (personalData: { name: string, graduationYear: string, employer: string }) => {
    console.log('Personal Information Form submitted:', personalData);
    console.log('Final Form Data:', {
      ...userData,
      ...personalData
    });

    // Here you would typically submit the complete form data to your API
    // and handle navigation to a success page or show a success message
  };

  return (
    <div className={styles.formContainer}>

      {/* Status */}


      {!isTabletOrMobile && (
        <div className={styles.status}>
          <div className={styles.statusText1}>SSB 2025</div>
          <div className={styles.statusText2}>PGP Admission Open for Aug/Sep 2025</div>
        </div>
      )}

      {isTabletOrMobile && (
        <div className={styles.status}>
          <div className={styles.statusText1}>Admissions OPEN for AU/sep 2025</div>
          <DisplayMobileCard />
        </div>
      )}

      {/* Form */}
      {currentStep === 'LOGIN' && (
        <AccountCreationForm
          control={loginControl}
          errors={loginErrors}
          handleSubmit={handleLoginSubmit}
          onSubmit={handleAccountFormSubmit}
          setError={setLoginError}
          clearErrors={clearLoginErrors}
        />
      )}
      {currentStep === 'OTP' && (
        <OtpVerificationForm
          control={otpControl}
          errors={otpErrors}
          handleSubmit={handleOtpSubmit}
          phoneNumber={userData.phone_number}
          email={userData.email}
          onWrongNumber={() => {
            setCurrentStep('LOGIN');
            setContextStep('LOGIN');
          }}
          onVerificationError={() => {
            setCurrentStep('LOGIN');
            setContextStep('LOGIN');
          }}
          onVerificationSuccess={() => {
            setCurrentStep('PERSONAL_DETAILS');
            setContextStep('PERSONAL_DETAILS');
          }}
          setError={setOtpError}
        />
      )}
      {currentStep === 'PERSONAL_DETAILS' && (
        <PersonalInformationForm onSubmit={handlePersonalInfoFormSubmit} />
      )}
    </div>

  );
} 