import { useState, useEffect } from 'react';
import styles from './RegistrationForm.module.scss';

interface OtpVerificationFormProps {
  onSubmit: (otp: string) => void;
  phoneNumber: string;
}

export default function OTPVerificationForm({ onSubmit, phoneNumber }: OtpVerificationFormProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  // const phoneNumber = '+91 0022233344'; // This should come from props or context

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
      if (!value && index > 0) {
        // Move focus to the previous input
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    } else if (e.key === 'Backspace') {
      if (otp[index]) {
        // if the current input is not empty, clear it
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        // dont move focus to the previous input if the current input is not empty
        e.preventDefault();
      } else if (index > 0) {
        // If current field is empty and backspace is pressed, move to previous field
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    } else if (/^\d$/.test(e.key)) {
      // If a digit is pressed, replace the current value
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);

      // Auto-focus next input if not the last one
      if (index < 5) {
        setTimeout(() => {
          document.getElementById(`otp-${index + 1}`)?.focus();
        }, 0);
      }

      // Prevent default to avoid double input
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // log the OTP
    const otpString = otp.join('');
    if (otpString.length < 6) {
      alert('Please enter a valid OTP');
      return;
    }
    console.log('OTP submitted:', otpString);
    onSubmit(otpString);
    // Handle OTP submission logic here
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
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
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