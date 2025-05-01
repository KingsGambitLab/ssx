import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";

export default function Page() {

  return (
    <div className={styles.container}>
      <ApplyCtaBanner />
      <Faq />
    </div>
  );
}
