import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import DegreeHero from "@modules/sst/degree/ui/DegreeHero";
import DegreeFaq from "@modules/sst/degree/ui/DegreeFaq";
import DegreePathways from "@modules/sst/degree/ui/DegreePathways";
import KeyFeatures from "@modules/sst/degree/ui/KeyFeatures";
import SkillsVsDegree from "@modules/sst/degree/ui/SkillsVsDegree";
import SstVsTraditional from "@modules/sst/degree/ui/SstVsTraditional";

import styles from "./page.module.scss";
import FloatingNavbar from "@components/common/FloatingNavbar/FloatingNavbar";

export default function Page() {
  const navItems = [
    { label: 'Scaler vs Traditional', key: 'sst-vs-traditional', href: '#sst-vs-traditional' },
    { label: 'Degree Tracks', key: 'degree-tracks', href: '#degree-pathways' },
    { label: 'Key Features', key: 'key-features', href: '#key-features' },
    { label: 'FAQs', key: 'faqs', href: '#faqs' },
  ];

  return (
    <div className={styles.container}>
      <FloatingNavbar items={navItems} />
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
