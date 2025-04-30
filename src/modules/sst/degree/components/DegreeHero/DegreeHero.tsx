import Image from 'next/image';
import Section from '@components/common/Section';
import styles from './DegreeHero.module.scss';
import DegreeHeroImage from '@public/images/sst/png/degree-hero.png';


const DegreeHero = () => {
  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              A Degree Designed for the Future, Not the Past
            </h1>
            <div className={styles.description}>
              Traditional engineering degrees were designed decades ago, but the world
              of technology moves fast.
            </div>
            <div className={styles.description}>
              We&apos;ve rethought what a CS program should be—one that prepares students
              for cutting-edge jobs, entrepreneurship, and higher studies across the world
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={DegreeHeroImage}
              alt="Students using VR technology"
              width={541}
              height={306}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DegreeHero;
