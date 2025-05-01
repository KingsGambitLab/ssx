import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";
import SstVsTraditional from "@modules/sst/career-outcomes/ui/SstVsTraditional";

export default function Page() {

  return (
    <div className={styles.container}>
      <SstVsTraditional />
      <ApplyCtaBanner />
      <Faq />
    </div>
  );
}
