"use client";

import React from "react";
import { Typography } from "antd";

import CarouselWrapper from "@components/common/CarouselWrapper/CarouselWrapper";
import VideoCardWithDesc from "@modules/sst/career-outcomes/components/VideoCardWithDesc";
import Section from "@components/common/Section";

import { pageTrackingSources } from "@modules/sst/career-outcomes/utils/tracking";
import { testimonialData } from "./data";

import styles from "./StudentTestimonials.module.scss";

export default function StudentTestimonials() {
  return (
    <Section>
      <div className={styles.testimonialSection}>
        <div className={styles.testimonialHeader}>
          <Typography.Title level={2} className={styles.testimonialTitle}>
            What our students have to say about their experience at SST
          </Typography.Title>
        </div>
        
        <div className={styles.carouselContainer}>
          <CarouselWrapper 
            slidesToShowInDesktop={2.5}
            slidesToShowInMobile={1.5}
            trackEventSource={pageTrackingSources.studentTestimonials}
          >
            {testimonialData.map((testimonial, index) => (
              <div key={index} className={styles.slideWrapper}>
                <VideoCardWithDesc
                  thumbnail={testimonial.thumbnailUrl.src}
                  title=""
                  videoId={testimonial.youtubeUrl}
                  desc=""
                  containerClass={styles.videoCardContainer}
                  trackEventSource={pageTrackingSources.studentTestimonials}
                />
              </div>
            ))}
          </CarouselWrapper>
        </div>
      </div>
    </Section>
  );
} 