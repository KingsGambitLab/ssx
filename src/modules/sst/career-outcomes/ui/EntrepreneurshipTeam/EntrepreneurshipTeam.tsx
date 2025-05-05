import Section from '@components/common/Section/Section';
import PeopleCard from '@components/Sst/PeopleCard';

import CarouselWrapper from '@components/common/CarouselWrapper/CarouselWrapper';

import { EntrepreneurshipTeamData } from '../../utils/data';
import { pageTrackingSources } from '@modules/sst/career-outcomes/utils/tracking';

import styles from './EntrepreneurshipTeam.module.scss';

export default function EntrepreneurshipTeam() {
  return (
    <Section section_class="entrepreneurship-team" id="entrepreneurship-team">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            {EntrepreneurshipTeamData.title}
          </div>
          <div className={styles.subTitle}>
            {EntrepreneurshipTeamData.subTitle}
          </div>
        </div>
        <div className={styles.peoplesWrapper}>
          <CarouselWrapper
            slidesToShowInDesktop={3.25}
            slidesToShowInMobile={1.25}
            trackEventSource={pageTrackingSources.entrepreneurshipTeam}
          >
            {EntrepreneurshipTeamData.people.map((person, index) => (
              <PeopleCard
                key={index}
                image={person?.image?.src} 
                name={person.name} 
                prevOrganisation={person.prevOrganisation} 
                currOrganisation={person.currOrganisation}
              />
            ))}
          </CarouselWrapper>
        </div>
      </div>
   </Section>
  );
}