'use client';

import Image from 'next/image';
import styles from './page.module.scss';

import { useDeviceType } from '@hooks/useDeviceType';

import RegistrationForm from '@modules/ssb/waitlist_form/components/RegistrationForm';

import HeroContent from '@modules/ssb/landing_v2/components/HeroContent/HeroContent';
import ssb_cover_image from '@public/images/ssb/SSB-460_1.webp';

import InstructorContainer from '@modules/ssb/landing_v2/ui/InstructorContainer';
import CompanyContainer from '@modules/ssb/landing_v2/ui/CompanyContainer';
import BusinessLeaderContainer from '@modules/ssb/landing_v2/ui/BusinessLeaderContainer';
import StudentFeatureContainer from '@modules/ssb/landing_v2/ui/StudentFeatureContainer';
import NewsCardContainer from '@modules/ssb/landing_v2/ui/NewsContainer';
import DisplayCardContainer from '@modules/ssb/landing_v2/ui/DisplayCardContainer';

export default function SchoolOfBusinessV2() {
  const { isTabletOrMobile } = useDeviceType();
  return (
    <div className={styles.root}>

      <div className={styles.bg_wrapper}>

        <Image src={ssb_cover_image} alt="School of Business" className={styles.bg_image} priority/>

        <div className={styles.content_container}>
          <div className={styles.left_section}>
            <HeroContent />
            <DisplayCardContainer />
            {isTabletOrMobile && (
              <RegistrationForm />
            )}
            <InstructorContainer />
            <CompanyContainer />
            <BusinessLeaderContainer />
            <StudentFeatureContainer />
            <NewsCardContainer />
          </div>

          {
            !isTabletOrMobile && (
              <div className={styles.right_section}>
                <RegistrationForm />
              </div>
            )
          }
        </div>
      </div>
      
    </div>
  );
}

