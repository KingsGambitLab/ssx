import SuccessStories from "@modules/sst/info/ui/SuccessStories";
import styles from "./page.module.scss";
import { CareerStats } from "@modules/sst/info/ui/CareerStats";
import AdmissionStepTimeline from "@modules/sst/info/ui/AdmissionStepTimeline";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <AdmissionStepTimeline />
          <CareerStats />
          <SuccessStories />
        </div>
      </div>
    </div>
  );
}
