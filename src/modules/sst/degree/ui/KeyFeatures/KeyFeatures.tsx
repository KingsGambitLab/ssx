import Section from '@components/common/Section';
import { keyFeaturesData } from '@modules/sst/degree/utils/data';
import KeyFeatureCard from '@modules/sst/degree/components/KeyFeatureCard';

import styles from './KeyFeatures.module.scss';

export default function KeyFeatures() { 
  return (
    <Section section_class='key-features' id='key-features'>
      <div className = {styles.container}>
        <div className = {styles.title}>
          Key Features
      </div>
      <div className={styles.content}>
        {keyFeaturesData.map((item, index) => (
          <KeyFeatureCard 
            key={index}
            alt={item.title}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            featureList={item.featureList}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}