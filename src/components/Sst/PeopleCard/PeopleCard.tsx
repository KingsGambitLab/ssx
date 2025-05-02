import Image from 'next/image';

import styles from './PeopleCard.module.scss';

import { EntrepreneurshipTeamPerson } from '@modules/sst/career-outcomes/types';

export default function PeopleCard({ key, image, name, prevOrganisation, currOrganisation }: EntrepreneurshipTeamPerson) {
  return (
    <div className={styles.container}>
      {image && (
        <Image src={image} alt={name} width={392} height={294} className={styles.peopleImage}/>
      )}
      <div className={styles.infoContainer}>
        <div className={styles.name}>{name}</div>

        <div className={styles.organisationContainer}>
          <div>{prevOrganisation}</div>
          <div>{currOrganisation}</div>
        </div>
      </div>

    </div>
  );
}