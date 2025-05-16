import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./RegistrationForm.module.scss";
import OtpVerificationForm from "./OtpForm/index";
import PersonalInformationForm from "./PersonalInformationForm/index";
import AccountCreationForm from "./AccountCreationForm/index";
import { useLoginContext } from "@context/ssb/LoginContext";
import { LoginFormData, OtpFormData, FormStep } from "../types/index";
import { useDeviceType } from "@hooks/useDeviceType";
import useUser from "@/hooks/useUser";

import DisplayMobileCard from "@modules/ssb/landing_v2/components/DisplayMobileCard";
import { Spin } from "antd";
// Types of form steps
export default function RegistrationForm() {
  const { data: userData } = useUser();
  const [currentStep, setCurrentStep] = useState<FormStep>("LOADING");
  const { setCurrentStep: setContextStep } = useLoginContext();
  //Track the device type
  const { isTabletOrMobile } = useDeviceType();

  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    setError: setLoginError,
    clearErrors: clearLoginErrors,
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      country_code: "+91",
      whatsapp_consent: true,
    },
  });

  // OTP step form management
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    setError: setOtpError,
  } = useForm<OtpFormData>({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const [formUserData, setFormUserData] = useState<LoginFormData>({
    email: "",
    phone_number: "",
    country_code: "+91",
    whatsapp_consent: true,
  });

  const handleAccountFormSubmit = (data: LoginFormData) => {
    setFormUserData({
      email: data.email,
      phone_number: data.phone_number,
      country_code: data.country_code,
      whatsapp_consent: data.whatsapp_consent,
    });
    setCurrentStep("OTP");
    setContextStep("OTP");
    console.log("Account Creation Form submitted:", data);
  };

  // Handle OTP verification submission
  const handleOtpFormSubmit = () => {
    setCurrentStep("PERSONAL_DETAILS");
    setContextStep("PERSONAL_DETAILS");
    window.location.reload();
  };

  const handleWaitlistSuccess = () => {
    console.log("Waitlist Success");
  };

  useEffect(() => {
    console.log("currentStep", currentStep);
    console.log("userData", userData);
    if (userData?.data?.id) {
      if (userData.isloggedIn) {
        setCurrentStep("PERSONAL_DETAILS");
        setContextStep("PERSONAL_DETAILS");
      } else {
        setCurrentStep("LOGIN");
        setContextStep("LOGIN");
      }
    } else {
      setCurrentStep("LOGIN");
      setContextStep("LOGIN");
    }
  }, [userData]);

  const renderForm = () => {
    switch (currentStep) {
      case "LOGIN":
        return (
          <AccountCreationForm
            control={loginControl}
            errors={loginErrors}
            handleSubmit={handleLoginSubmit}
            onSubmit={handleAccountFormSubmit}
            setError={setLoginError}
            clearErrors={clearLoginErrors}
          />
        );
      case "OTP":
        return (
          <OtpVerificationForm
            control={otpControl}
            errors={otpErrors}
            handleSubmit={handleOtpSubmit}
            phoneNumber={formUserData.phone_number}
            email={formUserData.email}
            onWrongNumber={() => {
              setCurrentStep("LOGIN");
              setContextStep("LOGIN");
            }}
            onVerificationError={() => {
              setCurrentStep("LOGIN");
              setContextStep("LOGIN");
            }}
            onVerificationSuccess={handleOtpFormSubmit}
            setError={setOtpError}
          />
        );
      case "PERSONAL_DETAILS":
        return (
          <PersonalInformationForm onSubmitSuccess={handleWaitlistSuccess} />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    return (
      <div className={styles.formContainer}>
        {!isTabletOrMobile && (
          <div className={styles.status}>
            <div className={styles.statusText1}>SSB 2025</div>
            <div className={styles.statusText2}>
              PGP Admission Open for Aug/Sep 2025
            </div>
          </div>
        )}

        {isTabletOrMobile && (
          <div className={styles.status}>
            <div className={styles.statusText1}>
              Admissions OPEN for AU/sep 2025
            </div>
            <DisplayMobileCard />
          </div>
        )}

        {renderForm()}
      </div>
    );
  };

  return renderContent();
}
