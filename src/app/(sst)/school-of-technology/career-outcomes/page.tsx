import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";
import SstVsTraditional from "@modules/sst/career-outcomes/ui/SstVsTraditional";
import Mentorship from "@modules/sst/career-outcomes/ui/Mentorship";
import HigherStudies from "@modules/sst/career-outcomes/ui/HigherStudies";
import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats";
import Entrepreneurship from "@modules/sst/career-outcomes/ui/Entrepreneurship";
import Placement from "@modules/sst/career-outcomes/ui/Placement/Placement";
import InnovationLabProjects from "@modules/sst/career-outcomes/ui/InnovationLabProjects";

export default function Page() {
  return (
    <div className={styles.container}>
      <CareerStats />
      <Placement />
      <InnovationLabProjects />
      <HigherStudies />
      <Entrepreneurship />
      <Mentorship />
      <SstVsTraditional />
      <ApplyCtaBanner />
      <Faq />
    </div>
  );
}
