import Section from "@components/common/Section";
import styles from "./HeroContent.module.scss";

import { HERO_CONTENT_CONTAINER } from "@modules/ssb/landing_v2/constants";

export default function HeroContent() {
  return (
    <Section section_class="hero-content" id="hero-content">
      <div className={styles.content}>
        <div className={styles.pgpTitle}>{HERO_CONTENT_CONTAINER.title}</div>

        <div className={styles.businessTitle}>
          <div className={styles.learnBusiness}>
            {HERO_CONTENT_CONTAINER.subtitle}
          </div>
          <div className={styles.industryLeaders}>
            {HERO_CONTENT_CONTAINER.subtitle2}
          </div>
        </div>

        <div className={styles.companyLogos}>
          {HERO_CONTENT_CONTAINER.topLogos.map((logo, index) => (
            <img
              src={logo.image}
              alt={logo.alt}
              className={styles.logo}
              key={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
