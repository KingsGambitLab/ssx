import { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import styles from './index.module.scss';

interface PersonalInformationFormProps {
    onSubmit: (data: { name: string; graduationYear: string; employer: string }) => void;
}

export default function PersonalInformationForm({ onSubmit }: PersonalInformationFormProps) {
    const [form] = Form.useForm();

    const handleSubmit = (values: { name: string; graduationYear: string; employer: string }) => {
        console.log('Form submitted:', values);
        onSubmit(values);
    };

    // Generate graduation year options from 2015 to 2024
    const graduationYears = [];
    for (let year = 2024; year >= 2015; year--) {
        graduationYears.push({ value: year.toString(), label: year.toString() });
    }

    return (
        <div className={styles.formWrapper}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>Personal Information</div>
                <div className={styles.subtitle}>We need a bit more info to setup your account</div>
            </div>

            {/* Form-Content */}
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                className={styles.form}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name="graduationYear"
                    rules={[{ required: true, message: 'Please select your graduation year' }]}
                >
                    <Select
                        placeholder="Select Graduation Year"
                        options={graduationYears}
                    />
                </Form.Item>

                <Form.Item
                    name="employer"
                    rules={[{ required: true, message: 'Please enter your most recent employer' }]}
                >
                    <Input placeholder="Enter Your Most Recent Employer" />
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
                        Proceed
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