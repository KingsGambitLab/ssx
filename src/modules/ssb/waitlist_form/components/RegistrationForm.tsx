import { useState } from 'react';
import styles from './RegistrationForm.module.scss';
import OtpVerificationForm from './OtpForm/index';
import PersonalInformationForm from './PersonalInformationForm/index';
import AccountCreationForm from './PhoneEmailForm/index';
import { useDeviceType } from '@hooks/useDeviceType';

import DisplayMobileCard from '@modules/ssb/landing_v2/components/DisplayMobileCard';

// Types of form steps
type FormStep = 'accountCreation' | 'otpVerification' | 'personalInformation';
export default function RegistrationForm() {

  //Track the current step of the form
  const [currentStep, setCurrentStep] = useState<FormStep>('accountCreation');

  //Track the device type
  const { isTabletOrMobile } = useDeviceType();

  // Track the form data
  const [formData, setFormData] = useState({
    // Account Creation
    email: '',
    mobile: '',
    receiveWhatsApp: true,

    //Personal Information
    name: '',
    graduationYear: '',
    employer: ''
  });

  const handleAccountFormSubmit = (accountData: { email: string, mobile: string, receiveWhatsApp: boolean }) => {
    setFormData({ ...formData, ...accountData });
    setCurrentStep('otpVerification');
    console.log('Account Creation Form submitted:', accountData);
    // Handle form submission
  };

  const handleOtpFormSubmit = (otpData: string) => {
    setCurrentStep('personalInformation');
    console.log('OTP submitted:', otpData);
    // Handle OTP submission logic here
  };

  const handlePersonalInfoFormSubmit = (personalData: { name: string, graduationYear: string, employer: string }) => {
    setFormData({ ...formData, ...personalData });
    console.log('Personal Information Form submitted:', personalData);

    console.log('Final Form Data:', formData);
    // Handle form submission logic here
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
      {currentStep === 'accountCreation' && (
        <AccountCreationForm onSubmit={handleAccountFormSubmit} />
      )}
      {currentStep === 'otpVerification' && (
        <OtpVerificationForm onSubmit={handleOtpFormSubmit} phoneNumber={formData.mobile} />
      )}
      {currentStep === 'personalInformation' && (
        <PersonalInformationForm onSubmit={handlePersonalInfoFormSubmit} />
      )}
    </div>

  );
} 