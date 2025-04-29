import SstVsTraditionalCard from '@modules/sst/degree/components/SstVsTraditionalCard';

import { sstVsTraditionalData } from '@modules/sst/degree/utils/data';

import styles from './SstVsTraditional.module.scss';

export default function SstVsTraditional() {
  return (
    <div className={styles.container}>
      {sstVsTraditionalData.map((item) => (
        <SstVsTraditionalCard 
          key={item.title} 
          variant={item.variant as "red" | "blue"}
          icon={item.icon}
          altIcon={item.altIcon}
          title={item.title}
          points={item.points}
          articles={item.articles}
        />
      ))}
    </div>
  );
}