import styles from './HeroContent.module.scss';
import uber_with_frame from '@public/images/ssb/uber_with_frame.webp';
import mckinsey_with_frame from '@public/images/ssb/mckinsey_with_frame.webp';
import colgate from '@public/images/ssb/colgate.webp';
import harvard from '@public/images/ssb/harvard.webp';

export default function HeroContent() {
  return (
    <div className={styles.content}>
      <div className={styles.pgpTitle}>Full-Time PGP in Management & Tech</div>
      
      <div className={styles.businessTitle}>
        <span className={styles.learnBusiness}>Learn business hands-on</span>
        <span className={styles.industryLeaders}>from 100+ industry leaders & faculty from</span>
      </div>
      
      <div className={styles.companyLogos}>
        <img src={uber_with_frame.src} alt="Uber" className={styles.logo} />
        <img src={mckinsey_with_frame.src} alt="McKinsey" className={styles.logo} />
        <img src={colgate.src} alt="Colgate" className={styles.logo} />
        <img src={harvard.src} alt="Harvard Business School" className={styles.logo} />
      </div>
    </div>
  );
}