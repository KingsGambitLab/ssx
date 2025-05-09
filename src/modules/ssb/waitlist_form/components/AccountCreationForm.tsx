import { useState } from 'react';
import styles from './RegistrationForm.module.scss';

interface AccountCreationFormProps {
  onSubmit: (data: { email: string; mobile: string; receiveWhatsApp: boolean }) => void;
}

export default function AccountCreationForm({ onSubmit }: AccountCreationFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    receiveWhatsApp: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Basic validation
    if (!formData.email || !formData.mobile) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit(formData);
    // Handle form submission logic here
  };
  return (
    <div className={styles.formWrapper}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Create your account</div>
        <div className={styles.subtitle}>Enter your details to proceed</div>
      </div>

      {/* Form-Content */}
      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.emailInput}>
          <input
            type="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.phoneInput}>
            <select className={styles.countryCode}>
              <option value="+91">+91</option>
            </select>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.receiveWhatsApp}
              onChange={(e) => setFormData({ ...formData, receiveWhatsApp: e.target.checked })}
            />
            <span>Receive updates and confirmation from us on WhatsApp</span>
          </label>
        </div>

        <div className={styles.deadline}>
          <span>Intake 3 Application Deadline - </span>
          <span className={styles.date}>11th May 2025</span>
        </div>

        <button type="submit" className={styles.submitButton}>
          Start your Application
        </button>

        <div className={styles.terms}>
          By creating an account I have read and agree to Scaler's{' '}
          <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
        </div>
      </form>
    </div>
  );
}