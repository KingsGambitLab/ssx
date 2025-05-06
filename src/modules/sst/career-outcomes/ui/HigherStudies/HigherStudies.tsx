import Section from '@components/common/Section';

import styles from './HigherStudies.module.scss';
import HigherStudiesCard from '@modules/sst/career-outcomes/components/HigherStudiesCard/HigherStudiesCard';
import { higherStudiesCardData } from '../../utils/data';

export default function HigherStudies() { 
  return (
    <Section section_class={styles.higherStudies} id='higher-studies'>
      <div className = {styles.container}>
        <div className={styles.sectionTitle}>
          Our Office of Further Education (OFE) Has Got You Covered
        </div>
        <div className={styles.content}>
          <div className={styles.features}>
            {higherStudiesCardData?.map((item, index) => (
            <HigherStudiesCard 
              key={index}
              title={item.title}
              desc={item.desc}
              featureList={item.featureList}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
