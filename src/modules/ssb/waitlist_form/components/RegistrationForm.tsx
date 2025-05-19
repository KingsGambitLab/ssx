import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "./RegistrationForm.module.scss";
import OtpVerificationForm from "./OtpForm/index";
import PersonalInformationForm from "./PersonalInformationForm/index";
import AccountCreationForm from "./AccountCreationForm/index";
import { useLoginContext } from "@context/ssb/LoginContext";
import { LoginFormData, OtpFormData, FormStep } from "../types/index";
import { useDeviceType } from "@hooks/useDeviceType";
import {
  trackEvent,
  trackingSources,
  trackingEvents,
} from "@modules/ssb/waitlist_form/utils/tracking";
import useUser from "@/hooks/useUser";

import DisplayMobileCard from "@modules/ssb/landing_v2/components/DisplayMobileCard";
// Types of form steps
export default function RegistrationForm() {
  const { data: userData } = useUser();
  const [currentStep, setCurrentStep] = useState<FormStep>("LOADING");
  const [isFixed, setIsFixed] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
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

  const getFormType = (currentStep: FormStep) => {
    let formType = "";

    if (currentStep === "LOGIN") {
      formType = trackingSources.waitlistLoginMobileForm;
    } else if (currentStep === "OTP") {
      formType = trackingSources.waitlistOTPModal;
    } else {
      formType = trackingSources.waitlistForm;
    }
    return formType;
  };

  const handleStepChange = (currentStep: FormStep) => {
    trackEvent.click({
      clickType: "click",
      clickText: "step_change",
      clickSource: trackingSources.waitlistForm,
      formType: getFormType(currentStep),
    });
    setCurrentStep(currentStep);
    setContextStep(currentStep);
  };

  const handleAccountFormSubmit = (data: LoginFormData) => {
    setFormUserData({
      email: data.email,
      phone_number: data.phone_number,
      country_code: data.country_code,
      whatsapp_consent: data.whatsapp_consent,
    });
    handleStepChange("OTP");
    console.log("Account Creation Form submitted:", data);
  };

  // Handle OTP verification submission
  const handleOtpFormSubmit = () => {
    window.location.reload();
  };

  const handleWaitlistSuccess = () => {
    console.log("Waitlist Success");
  };

  const handleWrongNumber = () => {
    handleStepChange("LOGIN");
    trackEvent.click({
      clickType: "click",
      clickText: trackingEvents.wrongPhoneNumber,
      clickSource: trackingSources.waitlistForm,
      formType: getFormType(currentStep),
    });
  };

  const handleVerificationError = (error: string) => {
    console.error("Verification failed:", error);
  };

  useEffect(() => {
    console.log("currentStep", currentStep);
    console.log("userData", userData);
    if (!userData) {
      handleStepChange("LOGIN");
    } else {
      if (userData?.data?.id) {
        if (userData.isloggedIn) {
          handleStepChange("PERSONAL_DETAILS");
        } else {
          handleStepChange("LOGIN");
        }
      }
    }
  }, [userData]);

  useEffect(() => {
    const handleScroll = () => {
      if (isTabletOrMobile) return;

      const newsSection = document.querySelector(".news-section"); // Add this class to your news section
      if (!newsSection || !formRef.current) return;

      const newsSectionBottom = newsSection.getBoundingClientRect().bottom;
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (newsSectionBottom <= viewportHeight) {
        setIsFixed(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsFixed(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTabletOrMobile]);

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
            onWrongNumber={handleWrongNumber}
            onVerificationError={handleVerificationError}
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
      <div
        className={`${styles.formContainer} ${!isFixed ? styles.nonFixed : ""}`}
        ref={formRef}
      >
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
              Admission Open for Aug/Sep 2025
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
