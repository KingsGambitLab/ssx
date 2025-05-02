import Section from '@components/common/Section';

import PeopleCard from '@components/Sst/PeopleCard/PeopleCard';
import CarouselWrapper from '@components/common/CarouselWrapper/CarouselWrapper';

import { CareerOfficersTeamData } from '../../utils/data';

import styles from './CareerOfficersTeam.module.scss';


export default function CareerOfficersTeam() {
  return (
    <Section section_class="career-officers-team" id="career-officers-team">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            {CareerOfficersTeamData.title}
          </div>
          <div className={styles.subtitle}>
            {CareerOfficersTeamData.subTitle}
          </div>
        </div>

        <div className={styles.teamContainer}>
          <CarouselWrapper slidesToShowInMobile={1.2} showInMobileOnly>
            {CareerOfficersTeamData.team.map((teamMember, index) => (
              <PeopleCard
                key={index}
                image={teamMember?.image?.src}
                name={teamMember.name}
                prevOrganisation={teamMember.prevOrganisation}
              currOrganisation={teamMember.currOrganisation}
              />
            ))}
          </CarouselWrapper>
        </div>
      </div>
    </Section>
  )
}
