"use client";
import Section from "@components/common/Section";

import { useDeviceType } from "@hooks/useDeviceType";
import { GuestSpeakersData } from "../../utils/data";

import GuestSpeakersCard from "../../components/GuestSpeakersCard/GuestSpeakersCard";

import styles from "./GuestSpeakers.module.scss";
import CarouselWrapper from "@components/common/CarouselWrapper";

export default function GuestSpeakers() {
  const { isMobile } = useDeviceType();
  return (
    <Section section_class="guest-speakers" id="guest-speakers">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            {isMobile ? GuestSpeakersData.title_mobile : GuestSpeakersData.title}
          </div>
          <div className={styles.subtitle}>
            {isMobile ? GuestSpeakersData.subTitle_mobile : GuestSpeakersData.subTitle}
          </div>
        </div>
        <div className={styles.cards}>
          <CarouselWrapper
            slidesToShowInDesktop={3.5}
            slidesToShowInMobile={1.4}
            scrollContainerClassName={styles.scrollContainer}
          >
            {GuestSpeakersData.guestSpeakers.map((card,index) => (
              <GuestSpeakersCard
                key={index}
                thumbnail={card?.thumbnail?.src}
                videoLink={card?.videoLink}
                desc={card?.desc}
              />
            ))}
          </CarouselWrapper>
        </div>
      </div>
    </Section>
  );
}