import Section from "@components/common/Section";

import { SuccessStoriesData } from "../../utils/data";

import CarouselWrapper from "@components/common/CarouselWrapper";
import SuccessStoryCard from "../SuccessStoryCard/SuccessStoryCard";

import styles from "./SuccessStories.module.scss";

export default function SuccessStories() {
  return (
    <Section section_class="success-stories" id="success-stories">
      <div className={styles.container}>
        <CarouselWrapper slidesToShowInDesktop={3.5} slidesToShowInMobile={1.3}>
          {SuccessStoriesData.map((story, index) => (
            <SuccessStoryCard
              key={index}
              isVideoCard={story?.videoLink ? true : false}
              thumbnail={story?.thumbnail?.src}
              title={story?.title}
              desc={story?.desc}
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