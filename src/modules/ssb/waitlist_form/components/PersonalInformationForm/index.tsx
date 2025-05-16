import { useState, useEffect, useMemo, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form as AntForm, Input, Select, Radio } from "antd";
import { toLower } from "lodash";
import styles from "./index.module.scss";
import { WaitlistFormData } from "../../types/index";
import { useWaitlistApi } from "../../api";
import { useSsbWaitlistCheck } from "@hooks/useSsbWaitlistCheck";
import { useQueryClient } from "@tanstack/react-query";

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
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (formFields.length > 0) {
      setValue(formFields[0].id, "");
    }
  }, [formFields, setValue]);

  const onSubmit = useCallback(
    async (data: WaitlistFormData) => {
      setIsLoading(true);
      setFormError(null); // Clear previous errors

      try {
        await submitWaitlistForm(data);
        await queryClient.invalidateQueries({ queryKey: ["fetch_user_data"] });
        onSubmitSuccess();
        window.open("/school-of-technology/application", "_blank")?.focus();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        setFormError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [submitWaitlistForm, queryClient, onSubmitSuccess]
  );

  const handleButtonClick = () => {
    console.log("Button clicked");
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

      <AntForm form={form} layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <AntForm.Item
            key={field.id}
            label={field.label}
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
                      onChange={(value) => {
                        controllerField.onChange(value);
                      }}
                      options={field.options?.map((opt) => ({
                        label: opt.label,
                        value: opt.value,
                      }))}
                    />
                  );
                }
                if (field.type === "radio") {
                  return (
                    <Radio.Group
                      {...controllerField}
                      defaultValue="Student"
                      buttonStyle="solid"
                    >
                      {field.options?.map((option) => (
                        <Radio key={option.value} value={option.value}>
                          {option.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  );
                }
                return (
                  <Input
                    {...controllerField}
                    placeholder={field.placeholder}
                    status={error ? "error" : undefined}
                    onBlur={(e) => {
                      controllerField.onChange(e);
                    }}
                  />
                );
              }}
            />
          </AntForm.Item>
        ))}

        <div className={styles.submitButtonWrapper}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Button
            type="primary"
            onClick={handleButtonClick}
            loading={isLoading}
            block
          >
            Proceed
          </Button>
        </div>
      </AntForm>
    </div>
  );
}
