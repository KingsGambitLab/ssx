import Image from 'next/image';

import styles from './SstRecruiters.module.scss';

import Dukaan from '@public/images/sst/svg/dukaan.svg';
import Allen from '@public/images/sst/svg/allen.svg';
import Clearfeed from '@public/images/sst/svg/clearfeed.svg';
import Consuma from '@public/images/sst/svg/consuma.svg';
import Eightfold from '@public/images/sst/svg/eightfold.svg';
import Freecharge from '@public/images/sst/svg/freecharge.svg';
import Rocketium from '@public/images/sst/svg/rocketium.svg';
import Swiggy from '@public/images/sst/svg/swiggy.svg';
import Tata from '@public/images/sst/svg/tata.svg';
import GrowthSchool from '@public/images/sst/svg/growthschool.svg';
import Wealthy from '@public/images/sst/svg/wealthy.svg';
import Pazcare from '@public/images/sst/svg/pazcare.svg';
import Section from '@components/common/Section';

const SstRecruiters = () => {
  const recruiters = [
    { src: Clearfeed, alt: 'ClearFeed', width: 145, height: 44 },
    { src: Swiggy, alt: 'Swiggy', width: 145, height: 41 },
    { src: Dukaan, alt: 'Dukaan', width: 145, height: 39 },
    { src: Tata, alt: 'Tata 1mg', width: 145, height: 32 },
    { src: GrowthSchool, alt: 'Growth School', width: 145, height: 50 },
    { src: Allen, alt: 'Allen', width: 145, height: 37 },
    { src: Consuma, alt: 'Consuma', width: 145, height: 44 },
    { src: Freecharge, alt: 'Freecharge', width: 145, height: 41 },
    { src: Eightfold, alt: 'Eightfold.ai', width: 145, height: 39 },
    { src: Pazcare, alt: 'Pazcare', width: 145, height: 32 },
    { src: Wealthy, alt: 'Wealthy', width: 145, height: 50 },
    { src: Rocketium, alt: 'Rocketium', width: 145, height: 37 },
  ];

  return (
    <Section section_class="sst-recruiters" id="sst-recruiters">
       <div className={styles.sstRecruiters}>
        <h2 className={styles.title}>Some of SST's Internship Recruiters</h2>
        <div className={styles.recruitersGrid}>
          {recruiters.map((recruiter, index) => (
            <div key={index} className={styles.imageContainer}>
              <Image
                src={recruiter.src}
                alt={recruiter.alt}
                width={recruiter.width}
                height={recruiter.height}
              />
            </div>
          ))}
        </div>
        <div className={styles.otherCompanies}>
          <div className={styles.pill}>
            <div className={styles.desktopText}>
              <span className={styles.count}>+140</span>
              <span className={styles.text}> other companies</span>
            </div>
            <div className={styles.mobileText}>
              <span className={styles.count}>140+</span>
              <span className={styles.text}>other companies</span>
            </div>
          </div>
        </div>
    </div>
   </Section>
  );
};

export default SstRecruiters;