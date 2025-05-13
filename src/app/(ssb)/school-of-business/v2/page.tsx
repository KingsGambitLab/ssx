'use client';

import Image from 'next/image';
import styles from './styles.module.scss';

import RegistrationForm from '@modules/ssb/waitlist_form/components/RegistrationForm';
import HeroContent from '@modules/ssb/landing_v2/components/HeroContent/HeroContent';
import ssb_cover_image from '@public/images/ssb/SSB-460_1.webp';
import DisplayCard from '@modules/ssb/landing_v2/components/DisplayCard/DisplayCard';

import InstructorContainer from '@modules/ssb/landing_v2/components/InstructorContainer/InstructorContainer';
import CompanyContainer from '@modules/ssb/landing_v2/components/CompanyContainer/CompanyContainer';
import BusinessLeaderContainer from '@modules/ssb/landing_v2/components/BusinessLeaderContainer/BusinessLeaderContainer';
import StudentFeatureContainer from '@modules/ssb/landing_v2/components/StudentFeatureContainer/StudentFeatureContainer';
import NewsCardContainer from '@modules/ssb/landing_v2/components/NewsCardContainer/NewsCardContainer';


export default function SchoolOfBusinessV2() {
  return (
    <div className={styles.root}>
      <div className={styles.bg_wrapper}>
        <Image 
          src={ssb_cover_image}
          alt="School of Business"
          className={styles.bg_image}
          priority
        />
        <div className={styles.content_container}>
          <div className={styles.left_section}>
            <HeroContent />
            <div className={styles.display_card_container}>
              <DisplayCard headText="Bangalore" sectionText="On-campus" />
              <DisplayCard headText="18 Months" sectionText="Includes 3-month internship" />
            </div>
            <InstructorContainer />
            <CompanyContainer />
            <BusinessLeaderContainer />
            <StudentFeatureContainer />
            <NewsCardContainer />
          </div>
          <div className={styles.right_section}>
            <RegistrationForm />
          </div>
        </div>
      </div>
      
    </div>
  );
}

