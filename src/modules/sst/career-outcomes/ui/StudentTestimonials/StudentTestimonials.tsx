"use client";

import React, { useState } from 'react';
import { Carousel, Typography } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import ArrowLeft from '@public/images/common/svg/arrow-left-black.svg';
import ArrowRight from '@public/images/common/svg/arrow-right-black.svg';
import Section from '@/components/common/Section';
import Image from 'next/image';
import styles from './StudentTestimonials.module.scss';
import { testimonialData } from './data';

const { Title } = Typography;

export const StudentTestimonials: React.FC = () => {
  const carouselRef = React.useRef<CarouselRef>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
    setPlayingVideo(null);
  };

  const handleVideoPlay = (id: string, index: number) => {
    // Only allow playing video if this is the active slide
    if (index === activeSlide) {
      setPlayingVideo(id);
    }
  };

  return (
    <Section 
      section_class={styles.testimonialSection} 
      id="student-testimonials"
    >
      <div className={styles.testimonialHeader}>
        <Title level={1}>What our students have to say about their experience at SST</Title>
      </div>
      <div className={styles.carouselContainer}>
        <button className={styles.carouselButton} onClick={handlePrev}>
          <img src={ArrowLeft.src} alt="arrow-left" />
        </button>
        
        <Carousel
          ref={carouselRef}
          dots={{ className: styles.dots }}
          beforeChange={handleBeforeChange}
          className={styles.carousel}
          centerMode
          centerPadding="0"
          slidesToShow={3}
          speed={500}
          autoplay={playingVideo ? false : { dotDuration: true }}
          autoplaySpeed={2000}
          infinite
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                centerMode: true,
              },
            },
          ]}
        >
          {testimonialData.map((item, index) => (
            <div key={item.id} className={styles.slideWrapper}>
              <div 
                className={`${styles.testimonialCard} ${activeSlide === index ? styles.activeCard : ''}`}
              >
                {playingVideo === item.id ? (
                  <div className={styles.videoContainer}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`${item.youtubeUrl}?autoplay=1`}
                      allow="autoplay;"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                ) : (
                  <div 
                    className={`${styles.thumbnailContainer} ${activeSlide === index ? styles.activeThumbnail : ''}`}
                    onClick={() => handleVideoPlay(item.id, index)}
                  >
                    <Image
                      src={item.thumbnailUrl.src}
                      alt={item.alt}
                      layout="fill"
                      objectFit="cover"
                      className={styles.thumbnail}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
        
        <button className={styles.carouselButton} onClick={handleNext}>
          <img src={ArrowRight.src} alt="arrow-right" />
        </button>
      </div>
    </Section>
  );
};

export default StudentTestimonials; 