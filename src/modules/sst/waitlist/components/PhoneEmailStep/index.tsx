import React from 'react';
import { Form, Input, Select, Checkbox, Button } from 'antd';
import { Controller, UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormSetError, UseFormClearErrors } from 'react-hook-form';
import { LoginFormData } from '../../types';
import styles from './index.module.scss';
import TurnstileWidget from '@/utils/turnstile/turnstile';
import { getOtp } from '../../api';

interface PhoneEmailStepProps {
  register: UseFormRegister<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
  errors: FieldErrors<LoginFormData>;
  setError: UseFormSetError<LoginFormData>;
  clearErrors: UseFormClearErrors<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  control: any;
}

export const PhoneEmailStep: React.FC<PhoneEmailStepProps> = ({
  onSubmit,
  errors,
  handleSubmit,
  control,
  setError,
  clearErrors
}) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const onSubmitForm = async (data: LoginFormData) => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const response = await getOtp(
        data.email,
        data.phone_number,
        data.country_code,
        data.whatsapp_consent,
        token
      );
      
      if (response.flashError) {
        throw { response: { status: response.status, data: response.flashError } };
      }
      
      onSubmit(data);
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
      
      setError('email', { 
        type: 'manual', 
        message: errorMessage
      });
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Enter your email and phone number</h3>
      
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
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
                placeholder="Enter your email"
                onChange={(e) => {
                  field.onChange(e);
                  if (errors.email) clearErrors('email');
                }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.phone_number ? 'error' : ''}
          help={errors.phone_number?.message}
        >
          <Input.Group>
            <Controller
              name="country_code"
              control={control}
              defaultValue="+91"
              render={({ field }) => (
                <Select {...field}>
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
                  placeholder="Enter Mobile number"
                  onChange={(e) => {
                    field.onChange(e);
                    if (errors.phone_number) clearErrors('phone_number');
                  }}
                />
              )}
            />
          </Input.Group>
        </Form.Item>

        <Form.Item>
          <Controller
            name="whatsapp_consent"
            control={control}
            defaultValue={true}
            render={({ field: { value, onChange } }) => (
              <div>
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  <div className={styles.whatsappConsent}>
                    <span>Connect on WhatsApp</span>
                  </div>
                </Checkbox>
                <p>By confirming I wish to receive updates and confirmation via WhatsApp</p>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item>
          <TurnstileWidget onTokenObtained={setToken} />
        </Form.Item>

        <div className={styles.submitSection}>
          {formError && (
            <div className={styles.formError}>
              {formError}
            </div>
          )}
          <Button 
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Get OTP
          </Button>
        </div>
      </form>
    </div>
  );
};
