/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from 'dayjs';

import CaseUtil from "@lib/caseUtil";

import { useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Skeleton,
} from "antd";

import { useApplicationForm } from "@hooks/useApplicationForm";
import { useWorkflowApi } from "@hooks/useWorkflowApi";

import { useApplicationFormApi } from "@modules/sst/application-form/api";
import {
  WaitlistStepFormData,
  WaitlistStepProps,
  FormattedFormFields,
} from "@modules/sst/application-form/types";
import { ROLE_SECTION_MAPPING } from "@modules/sst/application-form/utils/constants";

import { useWorkflowContext } from "@context/sst/WorkflowContext";
import { getValidationRules } from '../../utils/helper';

import {
  fetchWorkflowStepResponse,
} from "@/types/sst/workflow";

import FloatingCtaWrapper from '@/components/common/FloatingCtaWrapper/FloatingCtaWrapper';

import Footer from "../Footer";
import Header from "../Header";

import styles from "./WaitlistForm.module.scss";


export default function WaitlistForm({
  onSubmitSuccess,
  errors,
  handleSubmit,
  control,
}: WaitlistStepProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studentDetailsWorkflowStepId, setStudentDetailsWorkflowStepId] = useState<number | null>(null);
  const [workflowDefinitionStepIds, setWorkflowDefinitionStepIds] = useState<{
    workflowDefinitionId: number,
    formStepId: number
  }[]>([]);
  
  const { currentStep, fetchStepDetails } = useWorkflowContext();
  const { fetchCurrentWorkflowStepApi } = useWorkflowApi();
  const { studentPersonalDetailsForm } = useApplicationForm();
  const { submitPersonalDetailsFormResponse } = useApplicationFormApi();
  
  const queryClient = useQueryClient();  

  const formatDOB = (value: string) => {
    const date = dayjs(value);
    return date.format('YYYY-MM-DD');
  };

  const formatWaitlistFormData = useCallback((data: WaitlistStepFormData) => {
    const dobFormField = studentPersonalDetailsForm.find(
      field => field.title === "DOB"
    );

    return {
      ...data,
      [dobFormField?.id as string]: formatDOB(data[dobFormField?.id as string] as string),
    };
  }, [studentPersonalDetailsForm]);

  const handleFormSubmit = useCallback(async (data: WaitlistStepFormData) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const formattedData = formatWaitlistFormData(data);

      await submitPersonalDetailsFormResponse(formattedData, studentDetailsWorkflowStepId as number);
      await queryClient.invalidateQueries({ queryKey: ['fetch_user_data'] });
      onSubmitSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [
    formatWaitlistFormData, studentDetailsWorkflowStepId,
    submitPersonalDetailsFormResponse, queryClient
  ]);

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

  useEffect(() => {
    if (!currentStep?.id) return;

    const fetchWorkflowStep = async () => {
      try {
        const response = await fetchCurrentWorkflowStepApi(currentStep?.id);
  
        const formattedResponse = CaseUtil.toCase('camelCase', response) as fetchWorkflowStepResponse;
        const workflowSteps = formattedResponse?.included
          .filter((step) => step.type === 'workflow_step_definition')
          .map((step) => ({
            workflowDefinitionId: step.id,
            formStepId: step.attributes?.ownerId
          }));
        setWorkflowDefinitionStepIds(workflowSteps);
      } catch (error) {
        setFormError("Something went wrong. Please try reloading the page.");
        console.error(error);
      }
    }
  
    fetchWorkflowStep();
  }, [currentStep?.id]); 


  useEffect(() => {
    const updateStepLabels = async () => {
      const stepIds = workflowDefinitionStepIds.map(step => step.formStepId);

      const response = await fetchStepDetails(stepIds);
      const studentFormGroupLabel = ROLE_SECTION_MAPPING.student[0].formGroupLabel;

      response?.data?.forEach((step: any) => {
        const stepId = step.id;
        const stepLabel = step.attributes?.label;

        if (stepLabel === studentFormGroupLabel) {
          const workflowDefinitionId = workflowDefinitionStepIds.find(
            step => Number(step.formStepId) == Number(stepId)
          )?.workflowDefinitionId;

          setStudentDetailsWorkflowStepId(workflowDefinitionId as number);
        }
      });
    };

    updateStepLabels();

  }, [workflowDefinitionStepIds]);

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
                    htmlFor={field.id}
                    key={field.id}
                    className={field.width === "long" ? styles.inputFullWidth : ""}
                    required={field.required}
                    validateStatus={errors[field.id] ? "error" : ""}
                    help={errors[field.id]?.message}
                  >
                    <Controller
                      name={field.id}
                      control={control}
                      rules={getValidationRules(field)}
                      render={({ field: controllerField, fieldState: { error } }) =>
                        renderField(field, controllerField, error)
                      }
                    />
                  </Form.Item>
                ))}
              </div>

              {/* student consent checkbox */}
              <Form.Item
                htmlFor="force_update"
                validateStatus={errors.force_update ? "error" : ""}
                help={errors.force_update?.message}
              >
                <Controller
                  name="force_update"
                  control={control}
                  defaultValue={false}
                  rules={{
                    validate: (value) => value === true || "You must confirm eligibility to proceed",
                  }}
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
              <FloatingCtaWrapper targetId="waitlist-form">
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
              </FloatingCtaWrapper>
            </form>

            <Footer />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
