import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import SstVsTraditional from "@modules/sst/degree/ui/SstVsTraditional";
import KeyFeatures from "@modules/sst/degree/ui/KeyFeatures";
import DegreeFaq from "@modules/sst/degree/ui/DegreeFaq";

import styles from "./page.module.scss";
import DegreeHero from "@modules/sst/degree/ui/DegreeHero";


export default function Page() {

  return (

    <div className={styles.container}>
      <DegreeHero />
      <SstVsTraditional />
      <KeyFeatures />
      <ApplyCtaBanner />
      <DegreeFaq />
    </div>

  );
}
