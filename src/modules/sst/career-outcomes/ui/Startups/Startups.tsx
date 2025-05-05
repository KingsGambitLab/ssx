import Section from "@components/common/Section";

import { StartupsData } from "../../utils/data";

import StartupCard from "../../components/StartupCard/StartupCard";
import CarouselWrapper from "@components/common/CarouselWrapper";

import { pageTrackingSources } from "@modules/sst/career-outcomes/utils/tracking";

import styles from "./Startups.module.scss";

export default function Startups() {
  return (
    <Section section_class="startups" id="startups">
      <div className={styles.container}>
        <div className={styles.title}>
          {StartupsData.title}
        </div>
        <div className={styles.startups}>
          <CarouselWrapper
            slidesToShowInDesktop={3.8}
            slidesToShowInMobile={1.2}
            trackEventSource={pageTrackingSources.startups}
          >
            {StartupsData.startups.map((startup) => (
              <StartupCard
                key={startup.name}
                image={startup.image.src}
                name={startup.name}
                desc={startup.desc}
                cta_text={startup.cta_text}
                link={startup.link}
               />
            ))}
          </CarouselWrapper>
        </div>
      </div>
    </Section>
  );
}