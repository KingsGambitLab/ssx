/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form as AntForm, Input, Select } from "antd";
import Link from "next/link";
import styles from "./index.module.scss";

import { WaitlistFormData } from "../../types/index";
import { useWaitlistApi } from "../../api";
import { useSsbWaitlistCheck } from "@hooks/useSsbWaitlistCheck";
import { useQueryClient } from "@tanstack/react-query";

import {
  trackingEvents,
  trackingSources,
  trackEvent,
} from "../../utils/tracking";
interface PersonalInformationFormProps {
  onSubmitSuccess: () => void;
}

export default function PersonalInformationForm({
  onSubmitSuccess,
}: PersonalInformationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { formFields } = useSsbWaitlistCheck();
  const { submitWaitlistForm } = useWaitlistApi();
  const queryClient = useQueryClient();
  const [form] = AntForm.useForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const trackEventHandler = ({
    clickType,
    clickText,
    custom,
  }: {
    clickType: string;
    clickText: string;
    custom: any;
  }) => {
    trackEvent.click({
      clickType,
      clickText,
      clickSource: trackingSources.waitlistForm,
      formType: trackingSources.waitlistForm,
      custom: {
        ...custom,
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
      extraInfo: {
        form_source: trackingSources.waitlistForm,
        form_type: trackingSources.waitlistForm,
      },
      attributes: {
        status: formStatus,
        message: formError ? formattedErrors(formError) : "success",
        form_id: `ssb_waitlist_form_student_IN`,
      },
    });
  };

  const onSubmit = useCallback(
    async (data: WaitlistFormData) => {
      setIsLoading(true);
      setFormError(null); // Clear previous errors

      try {
        await submitWaitlistForm(data);
        await queryClient.invalidateQueries({ queryKey: ["fetch_user_data"] });
        trackFormSubmitStatus({ formStatus: "success" });
        onSubmitSuccess();
        window.open("/school-of-business/application", "_blank")?.focus();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        setFormError(errorMessage);
        trackFormSubmitStatus({ formStatus: "error", formError: errorMessage });
      } finally {
        setIsLoading(false);
      }
    },
    [submitWaitlistForm, queryClient, onSubmitSuccess]
  );

  const handleButtonClick = () => {
    trackEvent.click({
      clickType: "click",
      clickText: trackingEvents.waitlistFormSubmit,
      clickSource: trackingSources.waitlistForm,
      formType: trackingSources.waitlistForm,
      custom: {
        form_id: `ssb_waitlist_form_student_IN`,
      },
    });
    form.submit();
  };

  console.log("formFields", formFields);

  if (formFields.length === 0) {
    return null;
  }

  return (
    <div className={styles.formWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Personal Information</div>
        <div className={styles.subtitle}>
          We need a bit more info to setup your account
        </div>
      </div>

      <AntForm
        form={form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className={styles.form}
      >
        {formFields.map((field) => (
          <AntForm.Item
            key={field.id}
            required={field.required}
            validateStatus={errors[field.id] ? "error" : ""}
            help={errors[field.id]?.message}
          >
            <Controller
              name={field.id}
              control={control}
              rules={{
                required:
                  field.required &&
                  (field.label.toLowerCase().includes("email")
                    ? "Please enter your email address"
                    : "This field is required"),
                validate: {
                  fieldValidation: (value) => {
                    if (
                      field.type === "select" &&
                      field.label.toLowerCase().includes("grad")
                    ) {
                      return value
                        ? true
                        : "Please select your graduation year";
                    }
                    return true;
                  },
                },
              }}
              render={({ field: controllerField, fieldState: { error } }) => {
                if (field.type === "select") {
                  return (
                    <Select
                      {...controllerField}
                      status={error ? "error" : undefined}
                      placeholder={field.placeholder}
                      disabled={!!field.value}
                      size="large"
                      onChange={(value) => {
                        controllerField.onChange(value);
                        trackEventHandler({
                          clickType: "form_input_change",
                          clickText: trackingEvents.formInputFilled,
                          custom: {
                            field_type: field.label,
                            field_value: value,
                          },
                        });
                      }}
                      value={
                        controllerField.value === ""
                          ? undefined
                          : controllerField.value
                      }
                      defaultValue={field.value}
                      options={field.options?.map((opt) => ({
                        label: opt.label,
                        value: opt.value,
                      }))}
                    />
                  );
                }
                return (
                  <Input
                    {...controllerField}
                    placeholder={field.placeholder}
                    status={error ? "error" : undefined}
                    disabled={!!field.value}
                    size="large"
                    onClick={() => {
                      trackEventHandler({
                        clickType: "input_click",
                        clickText: trackingEvents.formInputFocus,
                        custom: { field: field.label },
                      });
                    }}
                    onBlur={(e) => {
                      controllerField.onChange(e);
                      trackEventHandler({
                        clickType: "input_change",
                        clickText: trackingEvents.formInputFilled,
                        custom: {
                          field_type: field.label,
                          field_value: e.target.value,
                        },
                      });
                    }}
                    defaultValue={field.value}
                  />
                );
              }}
            />
          </AntForm.Item>
        ))}

        <div className={styles.submitButtonWrapper}>
          <div className={styles.deadline}>
            <span>Intake 3 Application Deadline - </span>
            <span className={styles.date}>11th May 2025</span>
          </div>
          {formError && <div className={styles.formError}>{formError}</div>}
          {formFields.every((field) => field.value) ? (
            <Link
              href="/school-of-business/application"
              target="_blank"
              onClick={() => {
                trackEvent.click({
                  clickType: "click",
                  clickText: trackingEvents.waitlistFormSubmit,
                  clickSource: trackingSources.waitlistForm,
                  formType: trackingSources.waitlistForm,
                  custom: { form_id: `ssb_waitlist_form_student_IN` },
                });
              }}
              className={styles.button}
            >
              Resume Application
            </Link>
          ) : (
            <Button
              type="primary"
              onClick={handleButtonClick}
              loading={isLoading}
              block
            >
              Proceed
            </Button>
          )}
          <div className={styles.terms}>
            By creating an account I have read and agree to Scaler's{" "}
            <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </AntForm>
    </div>
  );
}
