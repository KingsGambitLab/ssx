import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames';


import styles from './AlumniCard.module.scss';
import { infoItemsProps } from './utils';

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
    <div className={classNames(styles.infoItems, styles[variant])}>
      <Image src={iconImage} alt={text} width={16} height={16} />
      <div className={classNames(styles.infoItemText, styles[variant])}>{text}</div>
    </div>
  )
}

export default function AlumniCard({ name, batchYear, city, state, school, image, children, variant = 'light' }: AlumniCardProps) {
  return (
    <div className={classNames(styles.container, styles[variant])}>
      <div className={classNames(styles.infoContainer, styles[variant])}>
        <Image
          src={image || `https://randomuser.me/api/portraits/women/1.jpg`}
          alt={name}
          width={104}
          height={104}
          onError={() => ('/images/fallback-avatar.jpg')}
          className={classNames(styles.alumniImage, styles[variant])}
        />
        <div className={classNames(styles.alumniInfo, styles[variant])}>
          <div className={classNames(styles.alumniName, styles[variant])}>{name}</div>
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