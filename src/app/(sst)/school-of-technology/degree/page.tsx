import SstVsTraditional from "@modules/sst/degree/ui/SstVsTraditional";
import KeyFeatures from "@modules/sst/degree/ui/KeyFeatures";
import styles from "./page.module.scss";

export default function Page() {

  return (
    <div className={styles.container}>
      <SstVsTraditional />
      <KeyFeatures />
    </div>
  );
}
