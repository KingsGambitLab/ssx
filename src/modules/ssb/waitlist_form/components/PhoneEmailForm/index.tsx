import React from 'react';
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import styles from './index.module.scss';

interface AccountCreationFormProps {
    onSubmit: (data: { email: string; mobile: string; receiveWhatsApp: boolean }) => void;
}

export default function AccountCreationForm({ onSubmit }: AccountCreationFormProps) {
    const [form] = Form.useForm();

    const handleSubmit = (values: { email: string; mobile: string; receiveWhatsApp: boolean }) => {
        onSubmit(values);
    };

    return (
        <div className={styles.formWrapper}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>Create your account</div>
                <div className={styles.subtitle}>Enter your details to proceed</div>
            </div>

            {/* Form-Content */}
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={{ receiveWhatsApp: true }}
                className={styles.form}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Email is required' },
                        { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                >
                    <Input
                        placeholder="Enter Email Address"
                    />
                </Form.Item>

                <Form.Item
                    name="mobile"
                    rules={[
                        { required: true, message: 'Phone number is required' },
                        {
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.resolve();
                                }
                                if (/^[0-9]{10}$/.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Please enter a valid 10-digit phone number'));
                            }
                        }
                    ]}
                >
                    <Input.Group>
                        <Select
                            defaultValue="+91"
                            style={{ width: '20%' }}
                            dropdownMatchSelectWidth={false}
                        >
                            <Select.Option value="+91">+91</Select.Option>
                        </Select>
                        <Form.Item
                            name="mobile"
                            noStyle
                        >
                            <Input
                                placeholder="Enter Mobile Number"
                                style={{ width: '80%' }}
                            />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    name="receiveWhatsApp"
                    valuePropName="checked"
                >
                    <Checkbox>
                        <span>Receive updates and confirmation from us on WhatsApp</span>
                    </Checkbox>
                </Form.Item>

                <div className={styles.deadline}>
                    <span>Intake 3 Application Deadline - </span>
                    <span className={styles.date}>11th May 2025</span>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Start your Application
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