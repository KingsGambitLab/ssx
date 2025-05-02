import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import SstVsTraditional from "@modules/sst/degree/ui/SstVsTraditional";
import KeyFeatures from "@modules/sst/degree/ui/KeyFeatures";
import DegreeFaq from "@modules/sst/degree/ui/DegreeFaq";

import styles from "./page.module.scss";
import DegreePathways from "@modules/sst/degree/ui/DegreePathways";
import SkillsVsDegree from "@modules/sst/degree/ui/SkillsVsDegree/SkillsVsDegree";
import DegreeHero from "@modules/sst/degree/ui/DegreeHero";

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
