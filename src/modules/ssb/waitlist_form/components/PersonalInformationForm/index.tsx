import { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { PersonalFormData } from '../../types/index';

interface PersonalInformationFormProps {
    onSubmit: (data: PersonalFormData) => void;
}

interface GraduationYearOption {
    value: string;
    label: string;
}


export default function PersonalInformationForm({ onSubmit }: PersonalInformationFormProps) {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<PersonalFormData>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            graduationYear: undefined,
            employer: ''
        }
    });

    const currentYear = new Date().getFullYear();
    const graduationYears: GraduationYearOption[] = [];
    for (let year = currentYear; year >= currentYear - 9; year--) {
        graduationYears.push({ value: year.toString(), label: year.toString() });
    }

    const onSubmitForm = (data: PersonalFormData) => {
        setLoading(true);
        try {
            onSubmit(data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formWrapper}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>Personal Information</div>
                <div className={styles.subtitle}>We need a bit more info to setup your account</div>
            </div>

            {/* Form-Content */}
            {/* <Form
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
            </Form> */}
            <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
                {/* Name Field */}
                <Form.Item
                    validateStatus={errors.name ? "error" : ""}
                    help={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <Input {...field} placeholder="Name" />
                        )}
                    />
                </Form.Item>

                {/* Graduation Year Field */}
                <Form.Item
                    validateStatus={errors.graduationYear ? "error" : ""}
                    help={errors.graduationYear?.message}
                >
                    <Controller
                        name="graduationYear"
                        control={control}
                        rules={{ required: "Graduation year is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select Graduation Year"
                                style={{ height: '40px' }}
                                options={graduationYears}
                            />
                        )}
                    />
                </Form.Item>

                {/* Employer Field */}
                <Form.Item
                    validateStatus={errors.employer ? "error" : ""}
                    help={errors.employer?.message}
                >
                    <Controller
                        name="employer"
                        control={control}
                        rules={{ required: "Employer is required" }}
                        render={({ field }) => (
                            <Input {...field} placeholder="Enter Your Most Recent Employer" />
                        )}
                    />
                </Form.Item>

                <div className={styles.deadline}>
                    <span>Intake 3 Application Deadline - </span>
                    <span className={styles.date}>11th May 2025</span>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Proceed
                    </Button>
                </Form.Item>

                <div className={styles.terms}>
                    By creating an account I have read and agree to Scaler's{' '}
                    <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
                </div>
            </form>
        </div>
    );
}