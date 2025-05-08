import { useState, useEffect } from 'react';
import styles from './RegistrationForm.module.scss';

export default function OTPVerificationForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const phoneNumber = '+91 0022233344'; // This should come from props or context

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification
  };

  const resendOTP = () => {
    setTimer(59);
    // Handle resend OTP logic
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.title}>Verifying your number</div>
          <div className={styles.subtitle}>
            OTP have been sent to {phoneNumber}
            <div><a href="#" className={styles.wrongNumber}>Wrong Contact Details?</a></div>
          </div>
        </div>

        {/* Form-Content */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.otpLabel}>OTP</div>
          <div className={styles.otpInputGroup}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className={styles.otpInput}
              />
            ))}
          </div>

          <div className={styles.resendOtp}>
            {timer > 0 ? (
              <span>Resend OTP in {timer} sec</span>
            ) : (
              <button type="button" onClick={resendOTP} className={styles.resendButton}>
                Resend OTP
              </button>
            )}
          </div>

          <div className={styles.deadline}>
            <span>Intake 3 Application Deadline - </span>
            <span className={styles.date}>11th May 2025</span>
          </div>

          <button type="submit" className={styles.submitButton}>
            Get OTP
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