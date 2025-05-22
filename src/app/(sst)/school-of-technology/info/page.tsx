import LoginForm from "@modules/sst/application-form/ui/LoginForm";

import { CareerStats } from "@modules/sst/info/ui/CareerStats";

import AdmissionStepTimeline from "@modules/sst/info/ui/AdmissionStepTimeline";
import BannerSection from "@modules/sst/info/ui/BannerSection";
import KeyDates from "@modules/sst/info/ui/KeyDates";
import SuccessStories from "@modules/sst/info/ui/SuccessStories";

import styles from "./page.module.scss";


export default function Page() {
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
