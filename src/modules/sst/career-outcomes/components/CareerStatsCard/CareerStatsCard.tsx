import Image from 'next/image';

import { useDeviceType } from '@hooks/useDeviceType';
import { CareerStatsCardProps } from '../../types';

import styles from './CareerStatsCard.module.scss';

export default function CareerStatsCard({ title, desc, image, variant = "primary", fullWidth = false }: CareerStatsCardProps) {
  const { isMobile } = useDeviceType();

  return (
    <div className={styles.container} data-variant={variant} data-full-width={fullWidth}>
      <div className={styles.heading}>
        {title}
      </div>
      <div className={styles.desc}>
        {desc}
      </div>
      {image && !isMobile && (
        <Image
          src={image}
          alt=""
          width={283}
          height={283}
          className={styles.bgImage}
        />
      )}
    </div>
  )
}