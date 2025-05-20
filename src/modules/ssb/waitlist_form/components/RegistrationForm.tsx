/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_BASE_URL } from "@utils/common/url";
import { apiRequest, HttpMethods } from "@utils/common/apiHelper";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "./RegistrationForm.module.scss";
import OtpVerificationForm from "./OtpForm/index";
import PersonalInformationForm from "./PersonalInformationForm/index";
import AccountCreationForm from "./AccountCreationForm/index";
import FormSkeleton from "./FormSkeleton/index";
import { useLoginContext } from "@context/ssb/LoginContext";
import { LoginFormData, OtpFormData, FormStep } from "../types/index";
import { useDeviceType } from "@hooks/useDeviceType";
import { generateJwt } from "@modules/common/apis";
import {
  trackEvent,
  trackingSources,
  trackingEvents,
} from "@modules/ssb/waitlist_form/utils/tracking";
// import useUser from "@/hooks/useUser";
import Section from "@components/common/Section";

import DisplayMobileCard from "@modules/ssb/landing_v2/components/DisplayMobileCard";
// Types of form steps
export default function RegistrationForm() {
  const [user, setUser] = useState<any>({});
  // const { data: userData } = useUser();
  const [currentStep, setCurrentStep] = useState<FormStep>("LOADING");
  const [isFixed, setIsFixed] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { setCurrentStep: setContextStep } = useLoginContext();
  //Track the device type
  const { isTabletOrMobile } = useDeviceType();
  const USER_DETAILS = `${API_BASE_URL}/api/v3/users`;

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
    if (!user) {
      handleStepChange("LOGIN");
    } else {
      if (user?.data?.id) {
        if (user.isloggedIn) {
          handleStepChange("PERSONAL_DETAILS");
        } else {
          handleStepChange("LOGIN");
        }
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwt = await generateJwt();
        if (jwt) {
          const userDataResponse = await apiRequest<any>(
            HttpMethods.GET,
            USER_DETAILS,
            {},
            { headers: { "X-User-Token": jwt } }
          );
          setUser({
            ...userDataResponse,
            isloggedIn: true,
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUser(undefined);
      }
    };
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (userData?.data?.id) {
  //     setUser(userData);
  //   }
  // }, [userData]);

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
        return <FormSkeleton />;
    }
  };

  const renderContent = () => {
    return (
      <Section id="form-container">
        <div
          className={`${styles.formContainer} ${
            !isFixed ? styles.nonFixed : ""
          }`}
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

          <div className={styles.allForms}>{renderForm()}</div>
        </div>
      </Section>
    );
  };

  return renderContent();
}
