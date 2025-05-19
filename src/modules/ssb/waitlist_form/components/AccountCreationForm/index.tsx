/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import {
  Controller,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
  UseFormHandleSubmit,
  Control,
} from "react-hook-form";
import styles from "./index.module.scss";

import TurnstileWidget from "@/utils/turnstile/turnstile";

import { getOtp } from "@modules/ssb/waitlist_form/api";
import { LoginFormData } from "@modules/ssb/waitlist_form/types";
import {
  trackEvent,
  trackingSources,
  trackingEvents,
} from "@modules/ssb/waitlist_form/utils/tracking";
import { TrackingProps } from "@modules/ssb/waitlist_form/types";

interface AccountCreationFormProps {
  onSubmit: (data: LoginFormData) => void;
  errors: FieldErrors<LoginFormData>;
  setError: UseFormSetError<LoginFormData>;
  clearErrors: UseFormClearErrors<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  control: Control<LoginFormData>;
}

export default function AccountCreationForm({
  onSubmit,
  errors,
  handleSubmit,
  control,
  setError,
  clearErrors,
}: AccountCreationFormProps) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

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
        form_id: trackingSources.waitlistLoginMobileForm,
      },
      extraInfo: {
        form_source: trackingSources.waitlistLoginMobileForm,
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
      clickSource: trackingSources.waitlistLoginMobileForm,
      formType: trackingSources.waitlistLoginMobileForm,
      custom: {
        ...custom,
      },
    });
  };

  const onSubmitForm = async (data: LoginFormData) => {
    if (!token) {
      setFormError("Please wait for security verification");
      return;
    }

    setLoading(true);
    try {
      const response = await getOtp(
        data.email,
        data.phone_number,
        data.country_code,
        data.whatsapp_consent,
        token
      );

      if (response.flashError) {
        throw {
          response: { status: response.status, data: response.flashError },
        };
      }

      trackFormSubmitStatus({ formStatus: "success" });
      onSubmit(data);
    } catch (error: any) {
      let errorMessage = `Something went wrong. Please try again later.`;

      switch (error.response?.status) {
        case 422:
          errorMessage = "Please fill the required fields";
          break;
        case 406:
          errorMessage = "Please wait for captcha verification, and try again";
          break;
        case 400:
          errorMessage = error.response?.data?.message || errorMessage;
          break;
        case 429:
          errorMessage = "Requested too many OTPs, please try after sometime";
          break;
        default:
          errorMessage = error.response?.data?.message || errorMessage;
      }

      setError("email", {
        type: "manual",
        message: errorMessage,
      });
      setFormError(errorMessage);
      trackFormSubmitStatus({ formStatus: "error", formError: errorMessage });
    } finally {
      setLoading(false);
      clearErrors("email");
    }
  };

  const onSubmitError = (error: any) => {
    trackFormSubmitStatus({ formStatus: "error", formError: error });
  };

  return (
    <div className={styles.formWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Create your account</div>
        <div className={styles.subtitle}>Enter your details to proceed</div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
        className={styles.form}
      >
        {/* Email Field */}
        <Form.Item
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Email Address"
                type="email"
                onClick={() =>
                  trackClickEventHandler({
                    clickType: "click",
                    clickText: trackingEvents.formInputFocus,
                    custom: {
                      field_type: "email",
                    },
                  })
                }
                onBlur={(e) => {
                  field.onChange(e);
                  trackClickEventHandler({
                    clickType: "click",
                    clickText: trackingEvents.formInputFilled,
                    custom: {
                      field_type: "email",
                      field_value: e.target.value,
                    },
                  });
                  if (errors.email) clearErrors("email");
                }}
              />
            )}
          />
        </Form.Item>

        {/* Phone Number Field */}
        <Form.Item
          validateStatus={errors.phone_number ? "error" : ""}
          help={errors.phone_number?.message}
        >
          <Input.Group>
            <Controller
              name="country_code"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(value: string) => {
                    field.onChange(value);
                    trackClickEventHandler({
                      clickType: "click",
                      clickText: trackingEvents.formInputFilled,
                      custom: {
                        field_type: "country_code",
                        field_value: value,
                      },
                    });
                  }}
                >
                  <Select.Option value="+91">
                    <span role="img" aria-label="India">
                      🇮🇳
                    </span>{" "}
                    +91
                  </Select.Option>
                  <Select.Option value="+977">
                    <span role="img" aria-label="Nepal">
                      🇳🇵
                    </span>{" "}
                    +977
                  </Select.Option>
                </Select>
              )}
            />
            <Controller
              name="phone_number"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Mobile Number"
                  style={{ width: "80%" }}
                  onClick={() =>
                    trackClickEventHandler({
                      clickType: "click",
                      clickText: trackingEvents.formInputFocus,
                      custom: { field_type: "phone_number" },
                    })
                  }
                  onBlur={(e) => {
                    field.onChange(e);
                    trackClickEventHandler({
                      clickType: "click",
                      clickText: trackingEvents.formInputFilled,
                      custom: {
                        field_type: "phone_number",
                        field_value: e.target.value,
                      },
                    });
                    if (errors.phone_number) clearErrors("phone_number");
                  }}
                />
              )}
            />
          </Input.Group>
        </Form.Item>

        <Form.Item style={{ width: "0px", height: "0px" }}>
          <TurnstileWidget onTokenObtained={setToken} />
        </Form.Item>

        <div className={styles.deadline}>
          <span>Intake 3 Application Deadline - </span>
          <span className={styles.date}>11th May 2025</span>
        </div>

        {formError && <div className={styles.formError}>{formError}</div>}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            block
            onClick={() =>
              trackClickEventHandler({
                clickType: "click",
                clickText: trackingEvents.waitlistLoginMobileFormSubmit,
              })
            }
          >
            Start your Application
          </Button>
        </Form.Item>

        {/* WhatsApp Consent */}
        <Form.Item>
          <Controller
            name="whatsapp_consent"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                  trackClickEventHandler({
                    clickType: "click",
                    clickText: trackingEvents.formInputFilled,
                    custom: {
                      field_type: "whatsapp_consent",
                      field_value: e.target.checked,
                    },
                  });
                }}
              >
                <span>
                  Receive updates and confirmation from us on WhatsApp
                </span>
              </Checkbox>
            )}
          />
        </Form.Item>

        <div className={styles.terms}>
          By creating an account I have read and agree to Scaler's{" "}
          <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
        </div>
      </form>
    </div>
  );
}
