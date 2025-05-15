/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Form, Button, message, Typography } from 'antd';
import { Controller, Control, UseFormHandleSubmit, FieldErrors, UseFormSetError } from 'react-hook-form';
import styles from './index.module.scss';
import Input from 'antd/lib/input';
import { OtpFormData } from '../../types/index';
import { verifyOtp } from '../../api';
const { Link } = Typography;

interface OtpVerificationFormProps {
    onVerificationSuccess: () => void;
    onVerificationError: (error: string) => void;
    phoneNumber: string;
    email: string;
    control: Control<OtpFormData>;
    handleSubmit: UseFormHandleSubmit<OtpFormData>;
    errors: FieldErrors<OtpFormData>;
    setError: UseFormSetError<OtpFormData>;
    onWrongNumber: () => void;
}

export default function OTPVerificationForm({
    phoneNumber,
    email,
    control,
    handleSubmit,
    errors,
    setError,
    onWrongNumber,
    onVerificationError,
    onVerificationSuccess
}: OtpVerificationFormProps) {
    // const [form] = Form.useForm();
    const [timer, setTimer] = useState(59);
    const [loading, setLoading] = useState(false);
    // const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Handle form submission
    const onSubmitForm = async (data: OtpFormData) => {
        setLoading(true);
        // setFormError(null);
        try {
            // Here you would validate OTP with your API
            const response = await verifyOtp(email, phoneNumber, data.otp);
            if (!response.userId) {
                throw new Error('Verification failed');
            }
            // For example:
            console.log('Verifying OTP:', data.otp);

            // If successful:
            onVerificationSuccess();
        } catch (error: any) {
            // Handle error
            setError('otp', {
                type: 'manual',
                message: 'Invalid OTP. Please try again.'
            });
            onVerificationError(error.message);
            // setFormError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = () => {
        setTimer(59);
        message.success('OTP resent successfully');
        // Implement your resend OTP logic here
    };

    return (
        <div className={styles.formWrapper}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>Verifying your number</div>
                <div className={styles.subtitle}>OTP has been sent to {phoneNumber}</div>
                <Link onClick={onWrongNumber} className={styles.link}>
                    Wrong Contact Details ?
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
                <div className={styles.otpFormItem}>
                    <Form.Item
                        validateStatus={errors.otp ? "error" : ""}
                        help={errors.otp?.message}
                    >
                        <Controller
                            name="otp"
                            control={control}
                            rules={{
                                required: "Please enter the OTP",
                                pattern: {
                                    value: /^[0-9]{6}$/,
                                    message: "Please enter a valid 6-digit OTP"
                                }
                            }}
                            render={({ field }) => (
                                <Input.OTP
                                    {...field}
                                    style={{ width: '100%' }}
                                    length={6}
                                    autoFocus
                                />
                            )}
                        />
                    </Form.Item>
                </div>

                {/* Timer for resend OTP */}
                <Form.Item>
                    {timer > 0 ? (
                        <div className={styles.secondaryText}>Resend OTP in {timer} sec</div>
                    ) : (
                        <Button type="link" onClick={resendOTP} style={{ paddingLeft: 0 }}>
                            Resend OTP
                        </Button>
                    )}
                </Form.Item>

                {/* Deadline information */}
                <div className={styles.deadline}>
                    <span>Intake 3 Application Deadline - </span>
                    <span className={styles.date}>11th May 2025</span>
                </div>

                {/* Submit button */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Verify OTP
                    </Button>
                </Form.Item>

                {/* Terms */}
                <div className={styles.terms}>
                    By creating an account I have read and agree to Scaler's{' '}
                    <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
                </div>
            </form>
        </div>
    );
}