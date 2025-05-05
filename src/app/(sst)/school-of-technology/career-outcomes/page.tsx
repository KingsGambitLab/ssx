import Faq from "@modules/sst/career-outcomes/ui/Faq";
import ApplyCtaBanner from "@components/Sst/ApplyCtaBanner";
import styles from "./page.module.scss";
import SstVsTraditional from "@modules/sst/career-outcomes/ui/SstVsTraditional";
import Mentorship from "@modules/sst/career-outcomes/ui/Mentorship";
import CareerStats from "@modules/sst/career-outcomes/ui/CareerStats/CareerStats";
import EntrepreneurshipTeam from "@modules/sst/career-outcomes/ui/EntrepreneurshipTeam/EntrepreneurshipTeam";
import HigherStudies from "@modules/sst/career-outcomes/ui/HigherStudies";
import CareerOfficersTeam from "@modules/sst/career-outcomes/ui/CareerOfficersTeam/CareerOfficersTeam";
import EducationTeam from "@modules/sst/career-outcomes/ui/EducationTeam";
import OutcomeHero from "@modules/sst/career-outcomes/ui/OutcomeHero";
import NowAtSST from "@modules/sst/career-outcomes/ui/NowAtSST";
import SstRecruiters from "@modules/sst/career-outcomes/ui/SstRecruiters";
import ProvenTrackRecord from "@modules/sst/career-outcomes/ui/ProvenTrackRecord";import Startups from "@modules/sst/career-outcomes/ui/Startups";
import Entrepreneurship from "@modules/sst/career-outcomes/ui/Entrepreneurship";
import Placement from "@modules/sst/career-outcomes/ui/Placement/Placement";
import InnovationLabProjects from "@modules/sst/career-outcomes/ui/InnovationLabProjects";
import GuestSpeakers from "@modules/sst/career-outcomes/ui/GuestSpeakers";
import SuccessStories from "@modules/sst/career-outcomes/ui/SuccessStories";
import FloatingNavbar from "@components/common/FloatingNavbar/FloatingNavbar";
import StudentTestimonials from '@/modules/sst/career-outcomes/ui/StudentTestimonials/StudentTestimonials';

export default function Page() {
  const navItems = [
    { label: "Job Prospectus", key: "career-stats", href: "#career-stats" },
    { label: "Higher Studies", key: "higher-studies", href: "#higher-studies" },
    { label: "Entrepreneurship", key: "entrepreneurship", href: "#mentorship" },
    { label: "FAQs", key: "faqs", href: "#faqs" },
  ];

  return (
    <div className={styles.container}>
      <FloatingNavbar items={navItems} />
      <OutcomeHero />
      <CareerStats />
      <NowAtSST />
      <ProvenTrackRecord />
      <Placement />
      <SstRecruiters />
      <CareerOfficersTeam />
      <Entrepreneurship />
      <Mentorship />
      <Startups />
      <InnovationLabProjects />
      <EntrepreneurshipTeam />
      <HigherStudies />
      <SuccessStories />
      <EducationTeam />
      <StudentTestimonials />
      <GuestSpeakers />
      <SstVsTraditional />
      <ApplyCtaBanner />
      <Faq />
    </div>
  );
}
