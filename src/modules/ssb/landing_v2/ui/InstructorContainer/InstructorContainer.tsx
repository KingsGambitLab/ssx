'use client';

import styles from './InstructorContainer.module.scss';

import InstructorCard from "@modules/ssb/landing_v2/components/InstructorCard/InstructorCard";

import vidit_profile from '@public/images/ssb/Vidit_2.webp';
import narahari_profile from '@public/images/ssb/Narahari_2.webp';
import sandeep_profile from '@public/images/ssb/Sandeep_2.webp';
import anurag_profile from '@public/images/ssb/Anurag_2.webp';
import akash_profile from '@public/images/ssb/Akash_2.webp';
import kanishk_profile from '@public/images/ssb/Kanishk_2.webp';

import mckinsey_logo from '@public/images/ssb/mckinsey.webp';
import iim_mumbai_logo from '@public/images/ssb/iim_mumbai.webp';
import mars_logo from '@public/images/ssb/mars.webp';
import iim_shillong_logo from '@public/images/ssb/iim_shillong.webp';
import gartner_logo from '@public/images/ssb/gartner.webp';
import coinbase_logo from '@public/images/ssb/coinbase.webp';

export default function InstructorContainer() {
    return (
        <div className={styles.instructorContainer}>
            <div className={styles.instructorContainerTitle}>
                <div className={styles.instructorContainerTitleText1}>
                    Learn From
                </div>
                <div className={styles.instructorContainerTitleText2}>
                    IIM Faculty & Industry Leaders
                </div>
            </div>
            <div className={styles.instructorCardContainer}>
                <InstructorCard name="Vidit Jain" designation="Engagement Manager" profile_image={vidit_profile.src} company_image={mckinsey_logo.src} />
                <InstructorCard name="Narahari .H" designation="Faculty of Finance" profile_image={narahari_profile.src} company_image={iim_mumbai_logo.src} />
                <InstructorCard name="Sandeep Das" designation="Business Strategy" profile_image={sandeep_profile.src} company_image={mars_logo.src} />
                <InstructorCard name="Dr. Anurag .D" designation="Marketing Strategy" profile_image={anurag_profile.src} company_image={iim_shillong_logo.src} />
                <InstructorCard name="Dr. Akash .K" designation="Director of Research" profile_image={akash_profile.src} company_image={gartner_logo.src} />
                <InstructorCard name="Kanishk .M" designation="Product Head" profile_image={kanishk_profile.src} company_image={coinbase_logo.src} />
                
            </div>
            
        </div>
    )
}