import Section from "@components/common/Section";

import { EducationTeamData } from "@modules/sst/career-outcomes/utils/data";
import { pageTrackingSources } from "@modules/sst/career-outcomes/utils/tracking";

import CarouselWrapper from "@components/common/CarouselWrapper";
import PeopleCard from "@components/Sst/PeopleCard";

import styles from "./EducationTeam.module.scss";


export default function EducationTeam() {
  return (
    <Section section_class="education-team" id="education-team">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            {EducationTeamData.title}
          </div>
          <div className={styles.subtitle}>
            {EducationTeamData.subTitle}
          </div>
        </div>

        <div className={styles.teamWrapper}>
          <CarouselWrapper
            slidesToShowInDesktop={3.25}
            slidesToShowInMobile={1.25}
            trackEventSource={pageTrackingSources.educationTeam}
          >
            {EducationTeamData?.team?.map((person, index) => (
              <PeopleCard
                key={index}
                name={person.name}
                prevOrganisation={person.prevOrganisation}
                image={person?.image?.src}
              />
            ))}
          </CarouselWrapper>
        </div>
      </div>
    </Section>
  )
}
