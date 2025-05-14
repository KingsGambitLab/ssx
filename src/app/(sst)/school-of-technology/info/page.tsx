import SuccessStories from "@modules/sst/info/ui/SuccessStories";
import styles from "./page.module.scss";
import { CareerStats } from "@modules/sst/info/ui/CareerStats";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <CareerStats />
        <SuccessStories />
      </div>
    </div>
  );
}
