import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { PhoneEmailStep } from '@modules/sst/waitlist/components/PhoneEmailStep';
import { OTPStep } from '@modules/sst/waitlist/components/OTPStep';
import { LoginFormData, OTPFormData, LoginStep } from '../../types';
import Banner from '@modules/sst/waitlist/components/Banner';
import { ProgressBar } from '@modules/sst/waitlist/components/ProgressBar';
import { WaitlistForm } from '@modules/sst/waitlist/components/WaitlistForm';
import { useLoginModalContext } from '@context/sst/LoginModalContext';
import { trackEvent, trackingEvents, trackingSources } from '@modules/sst/waitlist/utils/tracking';
import useUser from '@/hooks/useUser';


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  initialStep?: LoginStep;
  formSource?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose,
  onLoginSuccess,
  formSource,
  initialStep = 'LOGIN',
}) => {
  const { data: userData } = useUser();
  const [step, setStep] = useState<LoginStep>(initialStep);
  const { setCurrentStep } = useLoginModalContext();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  
  const { 
    register: loginRegister, 
    handleSubmit,
    formState: { errors: loginErrors },
    setError: setLoginError,
    clearErrors: clearLoginErrors,
    control
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      country_code: '+91',
      whatsapp_consent: true,
    }
  });
  const { 
    register: otpRegister, 
    handleSubmit: handleOTPSubmit,
    formState: { errors: otpErrors },
    control: otpControl
  } = useForm<OTPFormData>({
    mode: 'onChange'
  });

  const getFormType = (currentStep: LoginStep) => {
    let formType = '';
    
    if(currentStep === 'LOGIN') {
      formType = trackingSources.waitlistLoginMobileForm;
    } else if(currentStep === 'OTP') {
      formType = trackingSources.waitlistLoginOTPForm;
    } else {
      formType = trackingSources.waitlistForm;
    }
    return formType;
  }

  const handleStepChange = (currentStep: LoginStep) => {
    if(isOpen) {
      trackEvent.click({
        clickType: 'click',
        clickText: 'step_change',
        clickSource: formSource,
        formType: getFormType(currentStep),
      })
    }
    setCurrentStep(currentStep);
    setStep(currentStep);
  }

  // Update step when initialStep changes
  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const onLoginSubmit = (data: LoginFormData) => {
    setPhoneNumber(`${data.country_code}-${data.phone_number}`);
    setEmail(data.email);
    handleStepChange('OTP');
    // API call here
  };

  const handleVerificationSuccess = () => {
    // Post verification actions
    window.location.reload();
  };

  const handleVerificationError = (error: string) => {
    console.error('Verification failed:', error);
  };

  const handleWaitlistSuccess = async () => {
    onClose();
    onLoginSuccess?.();
  };

  const handleWrongNumber = () => {
    handleStepChange('LOGIN');
    trackEvent.click({
      clickType: 'click',
      clickText: trackingEvents.wrongPhoneNumber,
      clickSource: formSource,
      formType: getFormType(step),
    })
  };

  // Close modal if user is already logged in
  useEffect(() => {
    if (userData?.isloggedIn && step === 'LOGIN') {
      onClose();
    }
  }, [userData?.isloggedIn, step]);

  const handleClose = () => {
    trackEvent.click({
      clickType: 'click',
      clickText: trackingEvents.waitlistModalClose,
      clickSource: formSource,
      formType: getFormType(step),
    })
    onClose();
  }

  return (
    <Modal 
      open={isOpen} 
      onCancel={handleClose}
      footer={null}
      width={800}
      className={styles.modal}
      rootClassName={styles.modalContainer}
    >
      <div className={styles.modalContent}>
        <Banner />
        <div className={styles.rightSection}>
          <ProgressBar currentStep={
            step === 'LOGIN' || step === 'OTP' ? 1 : 2
          } totalSteps={2} />
          
          {step === 'LOGIN' ? (
            <PhoneEmailStep 
              register={loginRegister}
              control={control}
              onSubmit={onLoginSubmit}
              errors={loginErrors}
              setError={setLoginError}
              clearErrors={clearLoginErrors}
              handleSubmit={handleSubmit}
              formSource={formSource}
            />
          ) : step === 'OTP' ? (
            <OTPStep
              phoneNumber={phoneNumber}
              email={email}
              register={otpRegister}
              onVerificationSuccess={handleVerificationSuccess}
              onVerificationError={handleVerificationError}
              onWrongNumber={handleWrongNumber}
              errors={otpErrors}
              handleSubmit={handleOTPSubmit}
              control={otpControl}
              formSource={formSource}
            />
          ) : (
            <WaitlistForm
              onSubmitSuccess={handleWaitlistSuccess}
              formSource={formSource}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}; 

export default LoginModal;
