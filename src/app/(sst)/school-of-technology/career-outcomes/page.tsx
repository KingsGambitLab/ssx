import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";
import SstVsTraditional from "@modules/sst/career-outcomes/ui/SstVsTraditional";
import Mentorship from "@modules/sst/career-outcomes/ui/Mentorship";

import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats/CareerStats";
import EntrepreneurshipTeam from "@modules/sst/career-outcomes/ui/EntrepreneurshipTeam/EntrepreneurshipTeam";
export default function Page() {

  return (
    <div className={styles.container}>
      <CareerStats />
      <Mentorship />
      <SstVsTraditional />
      <ApplyCtaBanner />
      <Faq />
      <EntrepreneurshipTeam />
    </div>
  );
}
