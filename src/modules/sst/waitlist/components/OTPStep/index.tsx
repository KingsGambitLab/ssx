/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Controller, UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { OTPFormData } from '../../types';
import styles from './index.module.scss';
import { WhatsAppOutlined } from '@ant-design/icons';
import { retryOtp } from '@modules/common/apis';
import { TurnstileModal } from '@modules/common/components/TurnstileModal';
import { TrackingProps } from '@modules/sst/alumni-directory/types';
import { verifyOtp } from '@modules/sst/waitlist/api';
import { trackEvent, trackingEvents, trackingSources } from '@modules/sst/waitlist/utils/tracking';


const { Text, Link } = Typography;

interface OTPStepProps {
  phoneNumber: string;
  email: string;
  register: UseFormRegister<OTPFormData>;
  onVerificationSuccess: () => void;
  onVerificationError: (error: string) => void;
  onWrongNumber: () => void;
  errors: FieldErrors<OTPFormData>;
  handleSubmit: UseFormHandleSubmit<OTPFormData>;
  control: any;
}

export const OTPStep: React.FC<OTPStepProps> = ({
  phoneNumber,
  email,
  onVerificationSuccess,
  onVerificationError,
  onWrongNumber,
  errors,
  handleSubmit,
  control,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResendOptions, setShowResendOptions] = useState(false);
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'sms' | 'voice' | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setShowResendOptions(true);
    }
  }, [timeLeft]);

  const formattedErrors = (error: any) => {
    const formattedErrors: Record<string, string> = {};
  
    Object.entries(error).forEach(([field, value]: [string, any]) => {
      if (value?.message) {
        formattedErrors[field] = value.message;
      }
    });

    return formattedErrors;
  }

  const trackFormSubmitStatus = ({formStatus, formError}: {formStatus: string, formError?: any}) => {
    trackEvent.formSubmitStatus({
      clickType: 'form_submit',
      clickText: trackingEvents.otpFormSubmit,
      clickSource: trackingSources.waitlistLoginOTPForm,
      attributes: {
        status: formStatus,
        message: formError? formattedErrors(formError) : 'success',
        form_id: trackingSources.waitlistLoginOTPForm,
      }
    })
  }

  const onSubmitForm = async (data: OTPFormData) => {
    setIsLoading(true);
    setFormError(null);
    
    try {
      const response = await verifyOtp(email, phoneNumber, data.otp);
      if (!response.userId) {
        throw new Error('Verification failed');
      }
      onVerificationSuccess();
      trackFormSubmitStatus({ formStatus: 'success' })
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Please try again.';
      
      switch (error.response?.status) {
        case 409:
          errorMessage = 'Phone number already taken';
          break;
        case 401:
          errorMessage = `OTP is ${error.response?.data?.result || 'invalid'}, please try again`;
          break;
        case 403:
          if (error.response?.data?.signature) {
            errorMessage = 'Session Limit Exceeded!';
            const redirectUrl = `${window.location.origin}/users/session-management/`
              + `?signature=${error.response.data.signature}`
              + `&source_path=${error.response.data.source_path}`;
            window.location.href = redirectUrl;
          }
          break;
        default:
          errorMessage = error.response?.data?.message || errorMessage;
      }
      
      setFormError(errorMessage);
      onVerificationError(errorMessage);
      trackFormSubmitStatus({ formStatus: 'error', formError: errorMessage })
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryOTP = async (token: string) => {
    if (!selectedChannel) return false;
    
    try {
      const success = await retryOtp(phoneNumber, selectedChannel, token);
      if (success) {
        setTimeLeft(60);
        setShowResendOptions(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error retrying OTP:', error);
      return false;
    }
  };


  const initiateRetry = (channel: 'whatsapp' | 'sms' | 'voice') => {
    setSelectedChannel(channel);
    setShowTurnstile(true);
    trackClickEventHandler({
      clickType: 'click',
      clickText: `Resend OTP via ${channel}`,
      clickSource: trackingSources.waitlistLoginOTPForm,
      custom: {
        modal_status: 'open',
      }
    })
  };

  const trackClickEventHandler = ({clickType, clickText, clickSource, custom}: TrackingProps) => {
    trackEvent.click({
      clickType,
      clickText,
      clickSource,
      custom,
    })
  }

  const onSubmitError = (error: any) => {
    trackFormSubmitStatus({
      formStatus: 'error',
      formError: formattedErrors(error),
    });
  }; 

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Enter verification code</h3>
      <Text className={styles.subHeading}>
        OTP have been sent to
      </Text>
      <div className={styles.contactInfo}>
        <Text>{phoneNumber}</Text> <span className={styles.divider}>|</span>
        <Link onClick={onWrongNumber} className={styles.wrongNumber}>
          Wrong Contact Details ?
        </Link>
      </div>
      
      <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)} className={styles.form}>
        <Form.Item
          validateStatus={errors.otp ? 'error' : ''}
          help={errors.otp?.message}
        >
          <Controller
            name="otp"
            control={control}
            rules={{
              required: 'OTP is required',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'Please enter a valid 6-digit OTP'
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter OTP"
                maxLength={6}
                className={styles.otpInput}
                onClick={() => trackClickEventHandler({
                  clickType: 'click',
                  clickText: trackingEvents.formInputFocus,
                  clickSource: trackingSources.waitlistLoginOTPForm,
                  custom: {
                    field_type: 'otp',
                  }
                })} 
                onBlur={() => {
                  trackClickEventHandler({
                    clickType: 'click',
                    clickText: trackingEvents.formInputFilled,
                    clickSource: trackingSources.waitlistLoginOTPForm,
                    custom: {
                      field_type: 'otp',
                      field_value: field.value,
                    }
                  })
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  field.onChange(value);
                }}
              />
            )}
          />
        </Form.Item>

        {showResendOptions ? (
          <div className={styles.resendOptions}>
            <Button
              type="primary"
              icon={<WhatsAppOutlined />}
              className={styles.whatsappButton}
              onClick={() => initiateRetry('whatsapp')}
            >
              Resend OTP via WhatsApp
            </Button>
            <div className={styles.otherOptions}>
              <Link onClick={() => initiateRetry('sms')}>
                Resend OTP via SMS
              </Link>
              <span>|</span>
              <Link onClick={() => initiateRetry('voice')}>
                Resend OTP via Call
              </Link>
            </div>
          </div>
        ) : (
          <Text className={styles.timer}>
            Resend OTP in {timeLeft}s
          </Text>
        )}

        <div className={styles.submitSection}>
          {formError && (
            <div className={styles.formError}>
              {formError}
            </div>
          )}
          <Button 
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Verify
          </Button>
        </div>
      </form>

      <TurnstileModal
        isOpen={showTurnstile}
        onClose={() => {
          setShowTurnstile(false);
          setSelectedChannel(null);
        }}
        onTokenObtained={handleRetryOTP}
      />
    </div>
  );
};
