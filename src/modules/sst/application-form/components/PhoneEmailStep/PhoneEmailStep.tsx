/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Image from "next/image";
import CalendarCheck from "@public/images/common/svg/calendar-check.svg";

import { getOtp } from "@modules/sst/application-form/api";
import { PhoneEmailStepFormData, PhoneEmailStepProps } from "@modules/sst/application-form/types";
import { trackFormSubmit } from "@modules/sst/application-form/utils/tracking";
import { useKeyDates } from "@context/sst/KeyDatesContext";

import FloatingCtaWrapper from "@/components/common/FloatingCtaWrapper/FloatingCtaWrapper";
import TurnstileWidget from "@/utils/turnstile/turnstile";

import Footer from "../Footer";
import Header from "../Header";

import styles from "./PhoneEmailStep.module.scss";

export default function PhoneEmailStep({
  onSubmit,
  errors,
  setError,
  control,
  handleSubmit
}: PhoneEmailStepProps) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { upcomingIntakeDetails, isLoading: isKeyDatesLoading } = useKeyDates();

  const setFormErrors = (errorMessage: string, field?: keyof PhoneEmailStepFormData) => {
    if (field) {
      setError(field, { type: 'manual', message: errorMessage });
    }
    setFormError(errorMessage);
  };

  const onSubmitForm = async (data: PhoneEmailStepFormData) => {
    if (!turnstileToken) return;

    setIsLoading(true);

    try {
      const response = await getOtp({
        email: data.email,
        phoneNumber: data.phone_number,
        countryCode: data.country_code,
        consent: data.whatsapp_consent,
        turnstileResponse: turnstileToken
      });

      if (response.flashError) {
        trackFormSubmit('phone-email-form', response.flashError);
        throw { response: { status: response.status, data: response.flashError } };
      }

      onSubmit(data);
      trackFormSubmit('phone-email-form');
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Please try again.';
      
      switch (error.response?.status) {
        case 422:
          errorMessage = 'Please fill the required fields';
          break;
        case 406:
          errorMessage = 'Please wait for captcha verification, and try again';
          break;
        case 400:
          errorMessage = error.response?.data?.message || errorMessage;
          break;
        case 429:
          errorMessage = 'Requested too many OTPs, please try after sometime';
          break;
        default:
          errorMessage = error.response?.data?.message || errorMessage;
      }

      trackFormSubmit('phone-email-form', errorMessage);
      setFormErrors(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const formatIntakeDeadlineDate = (date: string) => {
    return date.split(",")[0].trim();
  };

  const intakeDeadlineDate = upcomingIntakeDetails?.deadline 
    ? formatIntakeDeadlineDate(upcomingIntakeDetails.deadline)
    : 'Coming soon!';
  
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>
                Begin your Application Now 
              </div>
              <div className={styles.subtitle}>
                Unlock early scholarships and exclusive prep material!
              </div>
            </div>

            <form
              id="phone-email"
              className={styles.formContent}
              onSubmit={handleSubmit(onSubmitForm)}
            >
              {/* Email */}
              <Form.Item
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Email Address"
                      className={styles.input}
                    />
                  )}
                />
              </Form.Item>

              {/* Phone Number */}
              <Form.Item
                validateStatus={errors.phone_number ? 'error' : ''}
                help={errors.phone_number?.message}
              >
                <Input.Group className={styles.phoneInputGroup}>
                  <Controller
                    name="country_code"
                    control={control}
                    defaultValue="+91"
                    render={({ field }) => (
                      <Select
                        {...field}
                        aria-label="country_code"
                        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                        rootClassName={styles.select}
                      > 
                        <Select.Option value="+91">
                          <span role="img" aria-label="India">🇮🇳</span> +91
                        </Select.Option>
                        <Select.Option value="+977">
                          <span role="img" aria-label="Nepal">🇳🇵</span> +977
                        </Select.Option>
                      </Select>
                    )}
                  />

                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Mobile Number"
                        className={styles.input}
                      />
                    )}
                  />
                </Input.Group>
              </Form.Item>

              {/* Whatsapp Consent */}
              <Form.Item>
                <Controller
                  name="whatsapp_consent"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <Checkbox
                      name="whatsapp_consent"
                      className={styles.whatsappCheckbox}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    >
                      <div className={styles.whatsappConsentText}>
                        Receive updates and confirmation from us on WhatsApp
                      </div>
                    </Checkbox>
                  )}
                />
              </Form.Item>

              {/* Turnstile Widget */}
              <Form.Item>
                <TurnstileWidget onTokenObtained={setTurnstileToken} />
              </Form.Item>

              {/* Submit Section */}
              <FloatingCtaWrapper targetId="phone-email" isLoading={isKeyDatesLoading}>
                <div className={styles.submitSection}>
                {formError && (
                  <div className={styles.formError}>
                    {formError}
                  </div>
                )}

                <div className={styles.lastIntakeDate}>
                    <Image
                      src={CalendarCheck}
                      alt="calendar-check"
                      className={styles.calendarCheckIcon}
                      height={24}
                      width={24}
                    />
                  <div className={styles.lastIntakeDateText}>
                    Jan Intake Closes On: <span>{intakeDeadlineDate}</span>
                  </div>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={!!errors?.email || !!errors?.phone_number}
                  className={styles.submitButton}
                  block
                >
                  Start your Application
                  </Button>
                </div>
              </FloatingCtaWrapper>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}