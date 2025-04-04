import Image, { StaticImageData } from 'next/image';

import { infoItemsProps } from './utils';

import styles from './AlumniCard.module.scss';

type AlumniCardProps = {
  id?: string;
  name: string;
  batchYear: number;
  city: string;
  state: string;
  school: string;
  linkedin: string;
  image?: string;
  variant?: 'light' | 'dark';
  children?: React.ReactNode;
}

type InfoItemProps = {
  iconImage: StaticImageData | string;
  text: string;
  variant?: 'light' | 'dark';
}

const infoItems = ({ iconImage, text, variant = 'light' }: InfoItemProps) => {
  return (
    <div className={styles.infoItems} data-variant={variant}>
      <Image src={iconImage} alt={text} width={16} height={16} />
      <div className={styles.infoItemText} data-variant={variant}>{text}</div>
    </div>
  )
}

export default function AlumniCard({ name, batchYear, city, state, school, image, children, variant = 'light' }: AlumniCardProps) {
  return (
    <div className={styles.container} data-variant={variant}>
      <div className={styles.infoContainer} data-variant={variant}>
        <Image
          src={image || `https://randomuser.me/api/portraits/women/1.jpg`}
          alt={name}
          width={104}
          height={104}
          onError={() => ('/images/fallback-avatar.jpg')}
          className={styles.alumniImage}
          data-variant={variant}
        />
        <div className={styles.alumniInfo} data-variant={variant}>
          <div className={styles.alumniName} data-variant={variant}>{name}</div>
          <div className={styles.alumniMoreInfo}>
            {infoItemsProps(variant, batchYear, city, state, school).map(
              (item) => infoItems({ ...item, variant })
            )}
          </div>
        </div>
      </div>
      {children}
    </div >
  );
}