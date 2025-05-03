import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";
import SstVsTraditional from "@modules/sst/career-outcomes/ui/SstVsTraditional";
import Mentorship from "@modules/sst/career-outcomes/ui/Mentorship";
import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats/CareerStats";
import EntrepreneurshipTeam from "@modules/sst/career-outcomes/ui/EntrepreneurshipTeam/EntrepreneurshipTeam";
import HigherStudies from "@modules/sst/career-outcomes/ui/HigherStudies";
import CareerOfficersTeam from "@modules/sst/career-outcomes/ui/CareerOfficersTeam/CareerOfficersTeam";
import EducationTeam from "@modules/sst/career-outcomes/ui/EducationTeam";
import Startups from "@modules/sst/career-outcomes/ui/Startups";
import Entrepreneurship from "@modules/sst/career-outcomes/ui/Entrepreneurship";
import Placement from "@modules/sst/career-outcomes/ui/Placement/Placement";
import InnovationLabProjects from "@modules/sst/career-outcomes/ui/InnovationLabProjects";
import GuestSpeakers from "@modules/sst/career-outcomes/ui/GuestSpeakers/GuestSpeakers";
import SuccessStories from "@modules/sst/career-outcomes/components/SuccessStories";

export default function Page() {
  return (
    <div className={styles.container}>
      <CareerStats />
      <GuestSpeakers />
      <Startups />
      <Placement />
      <InnovationLabProjects />
      <HigherStudies />
      <Entrepreneurship />
      <SuccessStories />
      <Mentorship />
      <SstVsTraditional />
      <ApplyCtaBanner />
      <EntrepreneurshipTeam />
      <CareerOfficersTeam />
      <EducationTeam />
      <Faq />
    </div>
  );
}
