import Section from "@components/common/Section";

import { SuccessStoriesData } from "../../utils/data";

import { pageTrackingSources } from "@modules/sst/career-outcomes/utils/tracking";

import CarouselWrapper from "@components/common/CarouselWrapper";
import SuccessStoryCard from "../../components/SuccessStoryCard/SuccessStoryCard";

import styles from "./SuccessStories.module.scss";

export default function SuccessStories() {
  return (
    <Section section_class="success-stories" id="success-stories">
      <div className={styles.container}>
        <CarouselWrapper
          slidesToShowInDesktop={3.5}
          slidesToShowInMobile={1.3}
          trackEventSource={pageTrackingSources.successStories}
        >
          {SuccessStoriesData.map((story, index) => (
            <SuccessStoryCard
              key={index}
              isVideoCard={story?.videoId || story?.videoLink ? true : false}
              thumbnail={story?.thumbnail?.src}
              title={story?.title}
              desc={story?.desc}
              videoId={story?.videoId}
              videoLink={story?.videoLink}
              link={story?.link}
              ctaText={story?.ctaText}
            />
          ))}
        </CarouselWrapper>
      </div>
    </Section>
  );
}