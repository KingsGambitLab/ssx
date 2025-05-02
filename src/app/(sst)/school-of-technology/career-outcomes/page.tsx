import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";
import SstVsTraditional from "@modules/sst/career-outcomes/ui/SstVsTraditional";
import Mentorship from "@modules/sst/career-outcomes/ui/Mentorship";
import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats/CareerStats";
import EntrepreneurshipTeam from "@modules/sst/career-outcomes/ui/EntrepreneurshipTeam/EntrepreneurshipTeam";
import HigherStudies from "@modules/sst/career-outcomes/ui/HigherStudies";
import CareerOfficersTeam from "@modules/sst/career-outcomes/ui/CareerOfficersTeam/CareerOfficersTeam";

export default function Page() {

  return (
    <div className={styles.container}>
      <CareerStats />
      <HigherStudies />
      <Mentorship />
      <SstVsTraditional />
      <ApplyCtaBanner />
      <EntrepreneurshipTeam />
      <CareerOfficersTeam />
      <Faq />
      <CareerOfficersTeam />
    </div>
  );
}
