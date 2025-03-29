import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames';

import AlumniImage from '@/public/images/sst/svg/demo-img.svg';

import styles from './AlumniCard.module.scss';
import { infoItemsProps } from './utils';

type AlumniCardProps = {
  id: number;
  img: StaticImageData | string;
  name: string;
  batchYear: string;
  city: string;
  state: string;
  school: string;
  linkedin: string;
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

export default function AlumniCard({ name, batchYear, city, state, school, children, variant = 'light' }: AlumniCardProps) {
  return (
    <div className={classNames(styles.container, styles[variant])}>
      <div className={classNames(styles.infoContainer, styles[variant])}>
        <Image
          src={AlumniImage}
          alt={name}
          width={104}
          height={104}
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