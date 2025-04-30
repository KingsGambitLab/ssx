import SstVsTraditional from '@modules/sst/degree/ui/SstVsTraditional';
import KeyFeatures from "@modules/sst/degree/ui/KeyFeatures";
import styles from "./page.module.scss";
import DegreeHero from "@modules/sst/degree/components/DegreeHero/DegreeHero";


export default function Page() {

  return (

    <div className={styles.container}>
      <DegreeHero />
      <SstVsTraditional />
      <KeyFeatures />
    </div>

  );
}
