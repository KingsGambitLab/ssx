import styles from "./page.module.scss";

import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats/CareerStats";
import EntrepreneurshipTeam from "@modules/sst/career-outcomes/ui/EntrepreneurshipTeam/EntrepreneurshipTeam";
export default function Page() {

  return (
    <div className={styles.container}>
      <CareerStats />
      <EntrepreneurshipTeam />
    </div>
  );
}
