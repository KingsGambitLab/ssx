import { useState } from 'react';
import styles from './RegistrationForm.module.scss';

interface PersonalInformationFormProps {
  onSubmit: (data: { name: string; graduationYear: string; employer: string }) => void;
}

export default function PersonalInformationForm({ onSubmit }: PersonalInformationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: '',
    employer: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.graduationYear || !formData.employer) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(formData);
    // Handle form submission
  };

  return (
    <div className={styles.formWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Personal Information</div>
        <div className={styles.subtitle}>We need a bit more info to setup your account</div>
      </div>

      {/* Form-Content */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <select
            className={`${styles.input} ${styles.selectInput}`}
            value={formData.graduationYear}
            onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
          >
            <option value="" disabled selected>Select Graduation Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Enter Your Most Recent Employer"
            value={formData.employer}
            onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
            className={styles.input}
          />
        </div>

        <div className={styles.deadline}>
          <span>Intake 3 Application Deadline – </span>
          <span className={styles.date}>11th May 2025</span>
        </div>

        <button type="submit" className={styles.submitButton}>
          Proceed
        </button>

        <div className={styles.terms}>
          By creating an account I have read and agree to Scaler's{' '}
          <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
        </div>
      </form>
    </div>
  );
}