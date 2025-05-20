import { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Skeleton,
} from "antd";
import dayjs from 'dayjs';
import { Controller } from "react-hook-form";
import { useQueryClient } from '@tanstack/react-query';

import { useApplicationForm } from "@hooks/useApplicationForm";
import { useApplicationFormApi } from "@modules/sst/application-form/api";

import {
  WaitlistStepFormData,
  WaitlistStepProps,
  FormattedFormFields,
} from "@modules/sst/application-form/types";

import Header from "../Header";
import Footer from "../Footer";

import styles from "./WaitlistForm.module.scss";

export default function WaitlistForm({
  onSubmitSuccess,
  errors,
  handleSubmit,
  control,
}: WaitlistStepProps) {
  const { studentPersonalDetailsForm } = useApplicationForm();
  const { submitPersonalDetailsFormResponse } = useApplicationFormApi();
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const formatDOB = (value: string) => {
    const date = dayjs(value);
    return date.format('YYYY-MM-DD');
  };

  const formatWaitlistFormData = (data: WaitlistStepFormData) => {
    const dobFormField = studentPersonalDetailsForm.find(field => field.title === "DOB");

    return {
      ...data,
      [dobFormField?.id as string]: formatDOB(data[dobFormField?.id as string] as string),
    };
  };

  const handleFormSubmit = async (data: WaitlistStepFormData) => {
    setIsLoading(true);
    setFormError(null);

    const formattedData = formatWaitlistFormData(data);

    console.log("formattedData", formattedData);
    try {
      await submitPersonalDetailsFormResponse(formattedData);
      await queryClient.invalidateQueries({ queryKey: ['fetch_user_data'] });
      onSubmitSuccess();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (
    field: FormattedFormFields,
    controllerField: any,
    error: any
  ) => {
    if (field.type === "select") {
      return (
        <Select
          {...controllerField}
          className={styles.select}
          placeholder={field.placeholder}
          status={error ? "error" : undefined}
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          options={field.options?.map((opt: { label: string; value: string }) => ({
            label: opt.label,
            value: opt.value,
          }))}
        />
      );
    } else if (field.type === "date") {
      return (
        <DatePicker
          {...controllerField}
          className={styles.datePicker}
          placeholder={`${field.placeholder}*`}
          status={error ? "error" : undefined}
          format="YYYY-MM-DD"
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
        />
      );
    } else {
      return (
        <Input
          {...controllerField}
          type={field.type}
          placeholder={field.placeholder}
          status={error ? "error" : undefined}
          className={styles.input}
        />
      );
    }
  };

  console.log("studentPersonalDetailsForm", studentPersonalDetailsForm);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.formWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>Student Details</div>
            <div className={styles.subtitle}>
              Enter your details to proceed
            </div>
          </div>

          {/* Form Skeleton */}
          <Skeleton
            loading={!studentPersonalDetailsForm || studentPersonalDetailsForm.length === 0}
            active
            paragraph={{ rows: 9 }}
            className={styles.formSkeleton}
          >
            <form
              id="waitlist-form"
              onSubmit={handleSubmit(handleFormSubmit)}
              className={styles.form}
            >
              <div className={styles.formFields}>
                {studentPersonalDetailsForm.map((field) => (
                  <Form.Item
                    key={field.id}
                    className={field.width === "long" ? styles.inputFullWidth : ""}
                    required={field.required}
                    validateStatus={errors[field.id] ? "error" : ""}
                    help={errors[field.id]?.message}
                  >
                    <Controller
                      name={field.id}
                      control={control}
                      rules={{
                        required: field.required ? `${field.title} is required` : false,
                        validate: {
                          fieldValidation: (value) => {
                            if (
                              field.type === "select" &&
                              field.title.toLowerCase().includes("grad")
                            ) {
                              return value ? true : "Please select your graduation year";
                            } else if (field.type === "text") {
                              if (typeof value !== "string" || value.trim() === "") {
                                return "This field must be a valid string";
                              }
                            }
                            return true;
                          },
                        },
                        pattern: field.title.toLowerCase().includes("email")
                          ? {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter a valid email address",
                            }
                          : field.type === "text" ? {
                            value: /^[A-Za-z\s]+$/,
                            message: "Only alphabets are allowed",
                          } : undefined,
                      }}
                      render={({ field: controllerField, fieldState: { error } }) =>
                        renderField(field, controllerField, error)
                      }
                    />
                  </Form.Item>
                ))}
              </div>

              {/* student consent checkbox */}
              <Form.Item
                validateStatus={errors.force_update ? "error" : ""}
                help={errors.force_update?.message}
              >
                <Controller
                  name="force_update"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      name="force_update"
                      className={styles.eligibilityCheckbox}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    >
                      I confirm the candidate is ≤20 years old, meets eligibility
                      (Maths ≥60% in 12th or relevant projects/achievement), and has not
                      violated any NSET attempts limits.
                    </Checkbox>
                  )}
                />
              </Form.Item>

              {/* Submit Button */}
              <div className={styles.submitButtonWrapper}>
                {formError && (
                  <div className={styles.formError}>{formError}</div>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className={styles.submitButton}
                  block
                >
                  Submit
                </Button>
              </div>
            </form>

            <Footer />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
