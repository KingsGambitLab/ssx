import Image from 'next/image';

import styles from './PeopleCard.module.scss';

type PeopleCardProps = {
  key: number;
  image: string;
  name: string;
  prevOrganisation?: string;
  currOrganisation?: string;
}

export default function PeopleCard({ key, image, name, prevOrganisation, currOrganisation }: PeopleCardProps) {
  return (
    <div className={styles.container} key={key}>
      {image && (
        <Image src={image} alt={name} width={392} height={294} className={styles.peopleImage}/>
      )}
      <div className={styles.infoContainer}>
        <div className={styles.name}>{name}</div>

        <div className={styles.organisationContainer}>
          {prevOrganisation && <div>{prevOrganisation}</div>}
          {currOrganisation && <div>{currOrganisation}</div>}
        </div>
      </div>

    </div>
  );
}