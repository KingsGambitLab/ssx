import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";
import SstVsTraditional from "@modules/sst/career-outcomes/ui/SstVsTraditional";
import Mentorship from "@modules/sst/career-outcomes/ui/Mentorship";

export default function Page() {

  return (
    <div className={styles.container}>
      <Mentorship />
      <SstVsTraditional />
      <ApplyCtaBanner />
      <Faq />
    </div>
  );
}
