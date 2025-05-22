import { useDeviceType } from "@hooks/useDeviceType";

import styles from "./page.module.scss";

import BannerSection from "@modules/sst/info/ui/BannerSection";
import { CareerStats } from "@modules/sst/info/ui/CareerStats";
import SuccessStories from "@modules/sst/info/ui/SuccessStories";
import AdmissionStepTimeline from "@modules/sst/info/ui/AdmissionStepTimeline";
import KeyDates from "@modules/sst/info/ui/KeyDates";
import LoginForm from "@modules/sst/application-form/ui/LoginForm";

export default function Page() {
  // const { isMobile } = useDeviceType();

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <BannerSection />
          <KeyDates />
          <AdmissionStepTimeline />
          <CareerStats />
          <SuccessStories />
        </div>
        <div className={styles.rightContainer}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
