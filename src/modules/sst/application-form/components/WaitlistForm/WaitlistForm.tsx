import { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { Controller } from "react-hook-form";

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
  setError,
  handleSubmit,
  control
}: WaitlistStepProps) {
  const { studentPersonalDetailsForm } = useApplicationForm();
  const { submitFormResponse } = useApplicationFormApi();
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (data: WaitlistStepFormData) => {
    setIsLoading(true);
    setFormError(null);

    try {
      await submitFormResponse(data);
      onSubmitSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }

  }

  const renderField = (field: FormattedFormFields, controllerField: any, error: any) => {
    if (field.type === 'select') {
      return (
        <Select
          {...controllerField}
          className={styles.select}
          placeholder={field.placeholder}
          status={error ? 'error' : undefined}
          options={field.options?.map((opt: { label: string; value: string }) => ({
            label: opt.label,
            value: opt.value
          }))}
        />
      );
    } else if (field.type === 'date') {
      return (
        <DatePicker
          {...controllerField}
          className={styles.datePicker}
          placeholder={`${field.placeholder}*`}
          status={error ? 'error' : undefined}
          format="DD/MM/YYYY"
        />
      )
    } else {
      return (
        <Input
          {...controllerField}
          type={field.type}
          placeholder={field.placeholder}
          status={error ? 'error' : undefined}
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
              <div className={styles.title}>
                Student Details
              </div>
              <div className={styles.subtitle}>
                Enter your details to proceed
              </div>
            </div>

            <form id="waitlist-form" onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
              <div className={styles.formFields}>
                {studentPersonalDetailsForm.map((field) => (
                  <Form.Item
                    className={field.width === 'long' ? styles.inputFullWidth : ''}
                    required={field.required}
                    validateStatus={errors[field.title] ? 'error' : ''}
                    help={errors[field.title]?.message}
                  >
                    <Controller
                      name={field.title}
                      control={control}
                      rules={{
                        required: field.required ? `${field.title} is required` : false,
                        validate: {
                          fieldValidation: (value) => {
                            if (field.type === 'select' && field.title.toLowerCase().includes('grad')) {
                              return value ? true : 'Please select your graduation year';
                            } else if (field.type === 'text') {
                              
                            }
                            return true;
                          }
                        },
                        pattern: field.title.toLowerCase().includes('email') 
                          ? {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Please enter a valid email address'
                            }
                          : undefined
                      }}
                      render={({ field: controllerField, fieldState: { error } }) => (
                        renderField(field, controllerField, error)
                      )}
                    />
                  </Form.Item>
                ))}
              </div>

              {/* student consent checkbox */}
              <Form.Item
                validateStatus={errors.user_eligibility_consent ? "error" : ""}
                help={errors.user_eligibility_consent?.message}
              >
                <Controller
                  name="user_eligibility_consent"
                  control={control}
                  defaultValue={true}
                  rules={{ 
                    validate: (value) => value === true || "You must confirm eligibility to proceed." 
                  }}
                  render={({ field }) => (
                    <Checkbox
                      name="user_eligibility_consent"
                      className={styles.eligibilityCheckbox}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    >
                      I confirm the candidate is ≤20 years old,
                      meets eligibility (Maths ≥60% in 12th or relevant
                      projects/achievement), and has not violated any NSET
                      attempts limits.
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
        </div>
      </div>
    </div>
  );
}