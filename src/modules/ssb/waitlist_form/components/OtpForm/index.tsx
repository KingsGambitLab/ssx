/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { Form, Button, message, Typography } from "antd";
import {
  Controller,
  Control,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormSetError,
} from "react-hook-form";
import styles from "./index.module.scss";
import Input from "antd/lib/input";
import { OtpFormData } from "../../types/index";
import { verifyOtp } from "../../api";
import { retryOtp } from "@modules/common/apis";
import { TurnstileModal } from "@modules/common/components/TurnstileModal";
import { WhatsAppOutlined } from "@ant-design/icons";
import {
  trackEvent,
  trackingEvents,
  trackingSources,
} from "@modules/ssb/waitlist_form/utils/tracking";
import { TrackingProps } from "@modules/ssb/waitlist_form/types";
const { Link } = Typography;

interface OtpVerificationFormProps {
  onVerificationSuccess: () => void;
  onVerificationError: (error: string) => void;
  phoneNumber: string;
  email: string;
  control: Control<OtpFormData>;
  handleSubmit: UseFormHandleSubmit<OtpFormData>;
  errors: FieldErrors<OtpFormData>;
  setError: UseFormSetError<OtpFormData>;
  onWrongNumber: () => void;
}

export default function OTPVerificationForm({
  phoneNumber,
  email,
  control,
  handleSubmit,
  errors,
  setError,
  onWrongNumber,
  onVerificationError,
  onVerificationSuccess,
}: OtpVerificationFormProps) {
  const [timer, setTimer] = useState(60);
  const [showResendOptions, setShowResendOptions] = useState(false);
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<
    "whatsapp" | "sms" | "voice" | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setShowResendOptions(true);
    }
  }, [timer]);

  // Handle form submission
  const onSubmitForm = async (data: OtpFormData) => {
    setLoading(true);
    try {
      // Here you would validate OTP with your API
      const response = await verifyOtp(email, phoneNumber, data.otp);
      if (!response.userId) {
        throw new Error("Verification failed");
      }

      // If successful:
      onVerificationSuccess();
      trackFormSubmitStatus({ formStatus: "success" });
    } catch (error: any) {
      // Handle error
      setError("otp", {
        type: "manual",
        message: "Invalid OTP. Please try again.",
      });
      onVerificationError(error.message);
      trackFormSubmitStatus({ formStatus: "error", formError: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRetryOTP = async (token: string = "XXXX.DUMMY.TOKEN.XXXX") => {
    if (!selectedChannel) return false;
    try {
      const success = await retryOtp(
        `+91-${phoneNumber}`,
        selectedChannel,
        token
      );
      if (success) {
        setTimer(60);
        setShowResendOptions(false);
        message.success("OTP resent successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error retrying OTP:", error);
      message.error("Failed to resend OTP. Please try again.");
      return false;
    }
  };

  const initiateRetry = (channel: "whatsapp" | "sms" | "voice") => {
    setSelectedChannel(channel);
    setShowTurnstile(true);
    trackClickEventHandler({
      clickType: "click",
      clickText: `Resend OTP via ${channel}`,
      custom: {
        modal_status: "open",
      },
    });
  };

  const formattedErrors = (error: any) => {
    if (typeof error !== "object") return error;

    const formattedErrors: Record<string, string> = {};

    Object.entries(error).forEach(([field, value]: [string, any]) => {
      if (value?.message) {
        formattedErrors[field] = value.message;
      }
    });

    return formattedErrors;
  };

  const trackFormSubmitStatus = ({
    formStatus,
    formError,
  }: {
    formStatus: string;
    formError?: any;
  }) => {
    trackEvent.formSubmitStatus({
      attributes: {
        status: formStatus,
        message: formError ? formattedErrors(formError) : "success",
        form_id: trackingSources.waitlistLoginOTPForm,
      },
      extraInfo: {
        form_source: trackingSources.waitlistLoginOTPForm,
      },
    });
  };

  const trackClickEventHandler = ({
    clickType,
    clickText,
    custom,
  }: TrackingProps) => {
    trackEvent.click({
      clickType,
      clickText,
      clickSource: trackingSources.waitlistLoginOTPForm,
      formType: trackingSources.waitlistLoginOTPForm,
      custom: {
        ...custom,
      },
    });
  };

  const onSubmitError = (error: any) => {
    trackFormSubmitStatus({
      formStatus: "error",
      formError: error,
    });
  };

  return (
    <div className={styles.formWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Verifying your number</div>
        <div className={styles.subtitle}>
          OTP has been sent to {phoneNumber}
        </div>
        <Link onClick={onWrongNumber} className={styles.link}>
          Wrong Contact Details ?
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
        className={styles.form}
      >
        <div className={styles.otpFormItem}>
          <Form.Item
            validateStatus={errors.otp ? "error" : ""}
            help={errors.otp?.message}
          >
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "Please enter the OTP",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit OTP",
                },
              }}
              render={({ field }) => (
                <Input.OTP
                  {...field}
                  style={{ width: "100%" }}
                  length={6}
                  onClick={() =>
                    trackClickEventHandler({
                      clickType: "click",
                      clickText: trackingEvents.formInputFocus,
                      custom: {
                        field_type: "otp",
                      },
                    })
                  }
                  onBlur={() => {
                    trackClickEventHandler({
                      clickType: "click",
                      clickText: trackingEvents.formInputFilled,
                      custom: {
                        field_type: "otp",
                        field_value: field.value,
                      },
                    });
                  }}
                />
              )}
            />
          </Form.Item>
        </div>

        {/* Timer for resend OTP */}
        {showResendOptions ? (
          <div className={styles.resendOptions}>
            <Button
              type="primary"
              icon={<WhatsAppOutlined />}
              className={styles.whatsappButton}
              onClick={() => initiateRetry("whatsapp")}
            >
              Resend OTP via WhatsApp
            </Button>
            <div className={styles.otherOptions}>
              <Link onClick={() => initiateRetry("sms")}>
                Resend OTP via SMS
              </Link>
              <span>|</span>
              <Link onClick={() => initiateRetry("voice")}>
                Resend OTP via Call
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.secondaryText}>Resend OTP in {timer} sec</div>
        )}

        {/* Deadline information */}
        <div className={styles.deadline}>
          <span>Intake 3 Application Deadline - </span>
          <span className={styles.date}>11th May 2025</span>
        </div>

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Verify OTP
          </Button>
        </Form.Item>

        {/* Terms */}
        <div className={styles.terms}>
          By creating an account I have read and agree to Scaler's{" "}
          <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
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
}
