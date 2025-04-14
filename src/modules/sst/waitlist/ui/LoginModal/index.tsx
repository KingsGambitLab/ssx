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
import { trackEvent, trackingEvents, trackingSources } from '@modules/sst/waitlist/utils/tracking';
import useUser from '@/hooks/useUser';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  initialStep?: LoginStep;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  initialStep = 'LOGIN',
}) => {
  const { data: userData } = useUser();
  const [step, setStep] = useState<LoginStep>(initialStep);
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

  // Update step when initialStep changes
  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const onLoginSubmit = (data: LoginFormData) => {
    setPhoneNumber(`${data.country_code}-${data.phone_number}`);
    setEmail(data.email);
    setStep('OTP');
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
    setStep('LOGIN');
    trackEvent.click({
      clickType: 'click',
      clickText: trackingEvents.wrongNumber,
      clickSource: trackingSources.waitlistModal,
    })
  };

  // Close modal if user is already logged in
  useEffect(() => {
    if (userData?.isloggedIn && step === 'LOGIN') {
      onClose();
    }

    if(isOpen) {
      trackEvent.view({
        clickType: 'section_view',
        clickText: trackingEvents.waitlistFormView,
        clickSource: trackingSources.waitlistModal,
        custom: {
          form_type: step,
        }
      })
    }
  }, [userData?.isloggedIn, step]);

  useEffect(() => {
    trackEvent.view({
      clickType: 'section_view',
      clickText: trackingEvents.waitlistFormView,
      clickSource: trackingSources.waitlistModal,
      custom: {
        form_type: step,
      }
    })
  }, [step]);

  return (
    <Modal 
      open={isOpen} 
      onCancel={onClose}
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
            />
          ) : (
            <WaitlistForm
              onSubmitSuccess={handleWaitlistSuccess}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}; 

export default LoginModal;
