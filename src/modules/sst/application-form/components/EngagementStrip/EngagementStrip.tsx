import Image from 'next/image';
import { useEffect, useState } from 'react';

import { EngagementStripData } from '../../utils/constants';

import styles from './EngagementStrip.module.scss';

export default function EngagementStrip({ className = '' }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % EngagementStripData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>
      <Image
        src={EngagementStripData[activeIndex].icon}
        alt={EngagementStripData[activeIndex].alt}
        width={20}
        height={20}
      />
      <div className={styles.description}>{EngagementStripData[activeIndex].desc} </div>
    </div>
  );
}