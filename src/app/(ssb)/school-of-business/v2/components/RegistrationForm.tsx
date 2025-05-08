import { useState } from 'react';
import styles from './RegistrationForm.module.scss';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    receiveWhatsApp: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.status}>
        <div className={styles.statusText1}>SSB 2025</div>
        <div className={styles.statusText2}>PGP Admissions Portal</div>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <div className={styles.title}>Create your account</div>
          <div className={styles.subtitle}>Enter your details to proceed</div>
        </div>

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
    </div>
    
  );
} 