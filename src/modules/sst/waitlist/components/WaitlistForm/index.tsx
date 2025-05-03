/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form as AntForm, Radio, Input, Select, Button, Image, Flex } from 'antd';
import { toLower } from 'lodash';
import styles from './index.module.scss';
import { WaitlistFormData } from '../../types';
import { useWaitlistApi } from '../../api';
import { useWaitlistCheck } from '@hooks/useWaitlistCheck';
import { useQueryClient } from '@tanstack/react-query';

import ParentIcon from '@public/images/sst/svg/parentfamily.svg';
import StudentIcon from '@public/images/sst/svg/student.svg';

import { trackingEvents, trackingSources, trackEvent } from '../../utils/tracking';

interface WaitlistFormProps {
  onSubmitSuccess: () => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ 
  onSubmitSuccess,
}) => {
  const { handleCategoryChange, formFields, setShowWaitlistModal } = useWaitlistCheck();
  const { submitWaitlistForm } = useWaitlistApi();
  const queryClient = useQueryClient();
  const [form] = AntForm.useForm();

  // Memoize category field first to get its ID
  const categoryField = useMemo(() => 
    formFields.find(field => 
      field.type === 'radio' && 
      field.label.toLowerCase().includes('you are a')
    ), [formFields]
  );

  // Initialize form with default value only after categoryField is available
  const { control, watch, handleSubmit, setValue, formState: { errors } } = useForm<WaitlistFormData>({
    defaultValues: useMemo(() => ({
      [categoryField?.id || '']: categoryField ? 'Student' : undefined
    }), [categoryField]),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  // Add effect to set default value when categoryField becomes available
  useEffect(() => {
    if (categoryField) {
      setValue(categoryField.id, 'Student');
    }
  }, [categoryField, setValue]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = useState<string | null>(null);


  const trackEventHandler = ({ clickType, clickText, clickSource, custom }: {
    clickType: string;
    clickText: string;
    clickSource: string;
    custom: any;
  }) => {
    trackEvent.click({ clickType, clickText, clickSource, custom });
  }

  // Handle category change - make it immediate
  const onCategoryChange = useCallback((e: any) => {
    const value = e.target.value;
    const newCategory = value;
    
    // Update form and category state synchronously
    if (categoryField) {
      setValue(categoryField.id, value);
      handleCategoryChange(newCategory);
    }

    trackEventHandler({
      clickType: 'button_click',
      clickText: trackingEvents.waitlistCategoryChange,
      clickSource: trackingSources.waitlistForm,
      custom: {
        category: newCategory,
      }
    })
  }, [categoryField, setValue, handleCategoryChange]);

  // Memoize remaining fields
  const remainingFields = useMemo(() => 
    formFields.filter(field => {
      const isCategoryField = field.type === 'radio' && 
        field.label.toLowerCase().includes('you are a');
      return !isCategoryField;
    }), [formFields]
  );

  const formattedErrors = (error: any) => {
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
    const categoryValue = watch(categoryField?.id || "");

    trackEvent.formSubmitStatus({
      clickType: 'form_submit',
      clickText: trackingEvents.waitlistFormSubmit,
      clickSource: trackingSources.waitlistForm,
      attributes: {
        status: formStatus,
        message: formError? formattedErrors(formError) : 'success',
        form_id: `sst_waitlist_form_${toLower(categoryValue)}_IN`,
      }
    })
  }

  // Create a memoized submit handler
  const onSubmit = useCallback(async (data: WaitlistFormData) => {
    setIsLoading(true);
    setFormError(null); // Clear previous errors
    
    try {
      await submitWaitlistForm(data);
      await queryClient.invalidateQueries({ queryKey: ['fetch_user_data'] });
      setShowWaitlistModal(false);
      trackFormSubmitStatus({ formStatus: 'success' })
      onSubmitSuccess();
      window.open('/school-of-technology/application', '_blank')?.focus();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setFormError(errorMessage);
      trackFormSubmitStatus({ formStatus: 'error', formError: errorMessage })
    } finally {
      setIsLoading(false);
    }
  }, [submitWaitlistForm, queryClient, setShowWaitlistModal, onSubmitSuccess]);

  const handleButtonClick = () => {
    const categoryValue = watch(categoryField?.id || '');
    
    trackEvent.click({
      clickType: 'click',
      clickText: trackingEvents.waitlistFormSubmit,
      clickSource: trackingSources.waitlistForm,
      custom: {
        form_id: `sst_waitlist_form_${toLower(categoryValue)}_IN`,
      }
    })
    form.submit(); // This will trigger the onFinish handler
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Enter your details</h3>
      
      {/* Category selection outside scrollable area */}
      {categoryField && (
        <AntForm.Item
          layout='vertical'
          label="You are a"
          required={categoryField.required}
          validateStatus={errors[categoryField.id] ? 'error' : ''}
          help={errors[categoryField.id]?.message}
        >
          <Controller
            name={categoryField.id}
            control={control}
            rules={{ required: categoryField.required }}
            render={({ field }) => (
              <Flex align="center" justify="space-between">
                <Radio.Group 
                  {...field}
                  value={field.value}
                  onChange={onCategoryChange}
                  buttonStyle="solid"
                  defaultValue="Student"
                  optionType="button"
                >
                  {categoryField.options?.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      <div className={styles.radioContent}>
                        {option.value === 'Student' && (
                          <Image 
                            preview={false}
                            width={24}
                            height={24}
                            src={StudentIcon.src} 
                            alt="Student Icon" 
                          />
                        )}
                        {option.value === 'Parent / Family' && (
                          <Image 
                            preview={false}
                            width={24}
                            height={24}
                            src={ParentIcon.src} 
                            alt="Parent / Family Icon" 
                          />
                        )}
                        {option.label}
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              </Flex>
            )}
          />
        </AntForm.Item>
      )}
      
      {/* Scrollable area for remaining fields */}
      <div className={styles.formContent}>
        <AntForm
          form={form}
          layout="vertical" 
          onFinish={handleSubmit(onSubmit)}
        >
          {remainingFields.map((field) => (
            <AntForm.Item
              key={field.id}
              label={field.label}
              required={field.required}
              validateStatus={errors[field.id] ? 'error' : ''}
              help={errors[field.id]?.message}
            >
              <Controller
                name={field.id}
                control={control}
                rules={{ 
                  required: field.required && (
                    field.label.toLowerCase().includes('email') 
                      ? 'Please enter your email address'
                      : 'This field is required'
                  ),
                  validate: {
                    fieldValidation: (value) => {
                      if (field.type === 'select' && field.label.toLowerCase().includes('grad')) {
                        return value ? true : 'Please select your graduation year';
                      }
                      return true;
                    }
                  },
                  pattern: field.label.toLowerCase().includes('email') 
                    ? {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    : field.label.toLowerCase().includes('phone')
                    ? {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    : undefined
                }}
                render={({ field: controllerField, fieldState: { error } }) => {
                  if (field.type === 'select') {
                    return (
                      <Select
                        {...controllerField}
                        status={error ? 'error' : undefined}
                        placeholder={field.placeholder}
                        onChange={(value) => {
                          controllerField.onChange(value);
                          trackEventHandler({
                            clickType: 'form_input_change',
                            clickText: trackingEvents.formInputFilled,
                            clickSource: trackingSources.waitlistForm,
                            custom: {
                              field_type: field.label,
                              field_value: value,
                            }
                          })
                        }}
                        options={field.options?.map(opt => ({
                          label: opt.label,
                          value: opt.value
                        }))}
                      />
                    );
                  }
                  if (field.type === 'radio') {
                    return (
                      <Radio.Group {...controllerField}
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
                      status={error ? 'error' : undefined}
                      onClick={() => {
                        trackEventHandler({
                          clickType: 'input_click',
                          clickText: trackingEvents.formInputFocus,
                          clickSource: trackingSources.waitlistForm,
                          custom: {
                            field: field.label,
                          }
                        })
                      }}
                      onBlur={(e) => {
                        // Only allow numbers for phone fields
                        if (field.label.toLowerCase().includes('phone')) {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          controllerField.onChange(value);
                        } else {
                          controllerField.onChange(e);
                        }
                        trackEventHandler({
                          clickType: 'input_change',
                          clickText: trackingEvents.formInputFilled,
                          clickSource: trackingSources.waitlistForm,
                          custom: {
                            field_type: field.label,
                            field_value: e.target.value,
                          }
                        })
                      }}
                    />
                  );
                }}
              />
            </AntForm.Item>
          ))}

          <div className={styles.submitButtonWrapper}>
            {formError && (
              <div className={styles.formError}>
                {formError}
              </div>
            )}
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
    </div>
  );
};
