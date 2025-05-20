"use client";

import Section from "@components/common/Section";
import styles from "./InstructorContainer.module.scss";

import InstructorCard from "@modules/ssb/landing_v2/components/InstructorCard/InstructorCard";

import { INSTRUCTOR_CONTAINER } from "@modules/ssb/landing_v2/constants";

export default function InstructorContainer() {
  return (
    <Section section_class="instructor-container" id="instructor-container">
      <div className={styles.instructorContainer}>
        <div className={styles.instructorContainerTitle}>
          <div className={styles.instructorContainerTitleText1}>
            {INSTRUCTOR_CONTAINER.title}
          </div>
          <div className={styles.instructorContainerTitleText2}>
            {INSTRUCTOR_CONTAINER.topBusinessLeaders}
          </div>
        </div>
        <div className={styles.instructorCardContainer}>
          {INSTRUCTOR_CONTAINER.instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              name={instructor.name}
              designation={instructor.designation}
              profile_image={instructor.profile_image}
              company_image={instructor.company_image}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
