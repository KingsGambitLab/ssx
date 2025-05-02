import styles from "./page.module.scss";


import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats/CareerStats";
import EntrepreneurshipTeam from "@modules/sst/career-outcomes/ui/EntrepreneurshipTeam/EntrepreneurshipTeam";
import CareerOfficersTeam from "@modules/sst/career-outcomes/ui/CareerOfficersTeam/CareerOfficersTeam";
import EducationTeam from "@modules/sst/career-outcomes/ui/EducationTeam";
import Startups from "@modules/sst/career-outcomes/ui/Startups";
import GuestSpeakers from "@modules/sst/career-outcomes/ui/GuestSpeakers/GuestSpeakers";

export default function Page() {
  return (
    <div className={styles.container}>
      <CareerStats />
      <Startups />
      <GuestSpeakers />
      <EntrepreneurshipTeam />
      <CareerOfficersTeam />
      <EducationTeam />
    </div>
  );
}
