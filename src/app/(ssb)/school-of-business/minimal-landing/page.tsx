"use client";

import BusinessLeaderContainer from "@modules/ssb/landing_v2/ui/BusinessLeaderContainer";
import CompanyContainer from "@modules/ssb/landing_v2/ui/CompanyContainer";
import DisplayCardContainer from "@modules/ssb/landing_v2/ui/DisplayCardContainer";
import HeroContent from "@modules/ssb/landing_v2/components/HeroContent/HeroContent";
import Image from "next/image";
import InstructorContainer from "@modules/ssb/landing_v2/ui/InstructorContainer";
import NewsCardContainer from "@modules/ssb/landing_v2/ui/NewsContainer";
import RegistrationForm from "@modules/ssb/waitlist_form/components/RegistrationForm";
import SsbCoverImage from "@public/images/ssb/SSB-460_1.webp";
import StudentFeatureContainer from "@modules/ssb/landing_v2/ui/StudentFeatureContainer";
import styles from "./page.module.scss";

import { useDeviceType } from "@hooks/useDeviceType";

export default function SchoolOfBusinessV2() {
  const { isTabletOrMobile } = useDeviceType();
  return (
    <>
      <Image
        src={SsbCoverImage}
        alt="School of Business"
        className={styles.bg_image}
        priority
      />

      <div className={styles.content_container}>
        <div className={styles.left_section}>
          <div>
            <HeroContent />
            <DisplayCardContainer />
            {isTabletOrMobile && <RegistrationForm />}
          </div>
          <InstructorContainer />
          <CompanyContainer />
          <BusinessLeaderContainer />
          <StudentFeatureContainer />
          <NewsCardContainer />
        </div>

        {!isTabletOrMobile && (
          <div className={styles.right_section}>
            <RegistrationForm />
          </div>
        )}
      </div>
    </>
  );
}
