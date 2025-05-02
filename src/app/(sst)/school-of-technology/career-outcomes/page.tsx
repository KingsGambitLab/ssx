import styles from "./page.module.scss";

import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats";

export default function Page() {

  return (
    <div className={styles.container}>
      <CareerStats />
    </div>
  );
}
