import { useState } from 'react';
import styles from './RegistrationForm.module.scss';
import AccountCreationForm from './AccountCreationForm';
import OtpVerificationForm from './OtpVerificationForm';
import PersonalInformationForm from './PersonalInformationForm';
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

      {/* Status */}
      <div className={styles.status}>
        <div className={styles.statusText1}>SSB 2025</div>
        <div className={styles.statusText2}>PGP Admission Open for Aug/Sep 2025</div>
      </div>

      {/* Form */}
      {/* <AccountCreationForm /> */}
      {/* <OtpVerificationForm />  */}
      <PersonalInformationForm />
    </div>
    
  );
} 