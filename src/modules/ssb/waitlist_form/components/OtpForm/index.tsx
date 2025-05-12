import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import styles from './index.module.scss';

interface OtpVerificationFormProps {
    onSubmit: (otp: string) => void;
    phoneNumber: string;
}

export default function OTPVerificationForm({ onSubmit, phoneNumber }: OtpVerificationFormProps) {
    const [form] = Form.useForm();
    const [timer, setTimer] = useState(59);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleSubmit = (values: { otp: string }) => {
        console.log('OTP submitted:', values.otp);
        onSubmit(values.otp);
    };

    const resendOTP = () => {
        setTimer(59);
        message.success('OTP resent successfully');
        // Handle resend OTP logic
    };

    // OTP input configuration
    const otpInputProps = {
        inputType: "number" as const,
        length: 6,
        autoFocus: true,
        style: { width: '100%' }
    };

    return (
        <div className={styles.formWrapper}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>Verifying your number</div>
                <div className={styles.subtitle}>OTP has been sent to {phoneNumber}</div>
                <a href="#" className={styles.link}>Wrong Contact Details?</a>
            </div>

            {/* Form Content */}
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                className={styles.form}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Form.Item
                    label="OTP"
                    name="otp"
                    rules={[{ required: true, message: 'Please enter a valid OTP' }]}
                >
                    <Input.OTP
                        formatter={(str) => str.replace(/[^0-9]/g, '')}
                        {...otpInputProps}
                    />
                </Form.Item>

                <Form.Item>
                    {timer > 0 ? (
                        <div className={styles.secondaryText}>Resend OTP in {timer} sec</div>
                    ) : (
                        <Button type="link" onClick={resendOTP} style={{ paddingLeft: 0 }}>
                            Resend OTP
                        </Button>
                    )}
                </Form.Item>

                <div className={styles.deadline}>
                    <span>Intake 3 Application Deadline - </span>
                    <span className={styles.date}>11th May 2025</span>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Verify OTP
                    </Button>
                </Form.Item>

                <div className={styles.terms}>
                    By creating an account I have read and agree to Scaler's{' '}
                    <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
                </div>
            </Form>
        </div>
    );
}