/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react";
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

import { getOtp } from "../../api";
import { LoginFormData } from "../../types";

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
      console.error("Error during form submission:", error);
    } finally {
      setLoading(false);
      clearErrors("email");
    }
  };

  return (
    <div className={styles.formWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Create your account</div>
        <div className={styles.subtitle}>Enter your details to proceed</div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
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
              <Input {...field} placeholder="Enter Email Address" />
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
                  style={{ width: "20%" }}
                  dropdownMatchSelectWidth={false}
                >
                  <Select.Option value="+91">+91</Select.Option>
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
                />
              )}
            />
          </Input.Group>
        </Form.Item>

        {/* WhatsApp Consent */}
        <Form.Item>
          <Controller
            name="whatsapp_consent"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              >
                <span>
                  Receive updates and confirmation from us on WhatsApp
                </span>
              </Checkbox>
            )}
          />
        </Form.Item>

        <div className={styles.deadline}>
          <span>Intake 3 Application Deadline - </span>
          <span className={styles.date}>11th May 2025</span>
        </div>

        <Form.Item>
          <TurnstileWidget onTokenObtained={setToken} />
        </Form.Item>

        {formError && <div className={styles.formError}>{formError}</div>}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            block
          >
            Start your Application
          </Button>
        </Form.Item>

        <div className={styles.terms}>
          By creating an account I have read and agree to Scaler's{" "}
          <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
        </div>
      </form>
    </div>
  );
}
