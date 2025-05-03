import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import DegreeHero from "@modules/sst/degree/ui/DegreeHero";
import DegreeFaq from "@modules/sst/degree/ui/DegreeFaq";
import DegreePathways from "@modules/sst/degree/ui/DegreePathways";
import KeyFeatures from "@modules/sst/degree/ui/KeyFeatures";
import SkillsVsDegree from "@modules/sst/degree/ui/SkillsVsDegree";
import SstVsTraditional from "@modules/sst/degree/ui/SstVsTraditional";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <DegreeHero />
      <SstVsTraditional />
      <DegreePathways />
      <KeyFeatures />
      <SkillsVsDegree />
      <ApplyCtaBanner />
      <DegreeFaq />
    </div>
  );
}
