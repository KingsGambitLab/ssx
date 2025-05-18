import { Button, Form, Input, Typography } from 'antd';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { retryOtp } from '@modules/common/apis';
import { TurnstileModal } from '@modules/common/components/TurnstileModal';
import { verifyOtp } from '@modules/sst/application-form/api';

import WhatsappIcon from '@public/images/sst/svg/social/whatsapp.svg';

import { OtpStepFormData, OtpStepProps } from '../../types';
import EngagementStrip from '../EngagementStrip/EngagementStrip';
import Footer from '../Footer';
import Header from '../Header';

import styles from './OtpStep.module.scss';

const { Link } = Typography;

export default function OtpStep({
  onOtpVerificationSuccess,
  onOtpVerificationError,
  errors,
  setError,
  handleSubmit,
  control,
  phoneNumber,
  setStep,
  email
}: OtpStepProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResendOptions, setShowResendOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'sms' | 'voice' | null>(null);
  const [showTurnstile, setShowTurnstile] = useState(false);

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
  }

  const initiateRetry = (channel: 'whatsapp' | 'sms' | 'voice') => {
    setSelectedChannel(channel);
    setShowTurnstile(true);
  };

  const onSubmit = async (data: OtpStepFormData) => {
    setIsLoading(true)
    setFormError(null);

    try {
      const response = await verifyOtp(email, phoneNumber, data.otp);
      if (!response.userId) {
        throw new Error('Verification failed')
      }

      onOtpVerificationSuccess();
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
      onOtpVerificationError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResendOptions(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResendOptions(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContent}>
            {/* Title */}
            <div className={styles.titleWrapper}>
              <div className={styles.title}>Verifying your number</div>

              {/* Subtitle */}
              <div className={styles.subtitle}>
                OTP have been sent to
                <div className={styles.contactInfo}>
                  <div className={styles.phoneNumber}>{phoneNumber}</div>
                  <div className={styles.divider}>|</div>
                  <Link
                    onClick={() => setStep('PHONE_EMAIL')}
                    className={styles.wrongContactDetails}
                  >
                    Wrong Contact Details?
                  </Link>
                </div>
              </div>
            </div>

            {/* OTP Input */}
            <div className={styles.otpInputWrapper}>
              <div className={styles.otpInputHeading}>OTP</div>
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
                      message: 'Please enter a valid 6-digit OTP',
                    },
                  }}
                  render={({ field }) => <Input.OTP length={6} {...field} />}
                />
              </Form.Item>

              {/* Resend OTP */}
              <div className={styles.resendOtpWrapper}>
                {showResendOptions ? (
                  <>
                    <Button
                      icon={
                        <img
                          src={WhatsappIcon.src}
                          alt="Whatsapp"
                          height={20}
                          width={20}
                        />
                      }
                      onClick={() => initiateRetry('whatsapp')}
                      size="large"
                      block
                      className={styles.whatsappButton}
                    >
                      Resend OTP via WhatsApp
                    </Button>
                    <div className={styles.resendOtpWays}>
                      <Link onClick={() => initiateRetry('sms')}>
                        Resend OTP via SMS
                      </Link>
                      <span>|</span>
                      <Link onClick={() => initiateRetry('voice')}>
                        Resend OTP via Call
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.resendOtpText}>
                      Resend OTP in {timeLeft} sec
                    </div>
                    <EngagementStrip />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.submitButtonWrapper}>
            {formError && (
              <div className={styles.formError}>{formError}</div>
            )}
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={!!errors?.otp}
              className={styles.submitButton}
              block
            >
              Submit
            </Button>
          </div>
        </form>

        <Footer />
      </div>

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
}
