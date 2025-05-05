"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Carousel, Typography } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import ArrowLeft from '@public/images/common/svg/arrow-left-black.svg';
import ArrowRight from '@public/images/common/svg/arrow-right-black.svg';
import Section from '@/components/common/Section';
import Image from 'next/image';
import styles from './StudentTestimonials.module.scss';
import { testimonialData } from './data';
import { pageTrackingSources, trackEvent } from '@modules/sst/career-outcomes/utils/tracking';

const { Title } = Typography;

export const StudentTestimonials: React.FC = () => {
  const carouselRef = React.useRef<CarouselRef>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Use effect to create iframe after render
  useEffect(() => {
    if (playingVideo && videoContainerRef.current) {
      // Remove any existing iframes
      const existingIframes = videoContainerRef.current.querySelectorAll('iframe');
      existingIframes.forEach(iframe => {
        iframe.remove();
      });
      
      // Find the video data
      const videoData = testimonialData.find(item => item.id === playingVideo);
      
      if (videoData) {
        // Create new iframe
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = `${videoData.youtubeUrl}?autoplay=1`;
        iframe.allow = 'autoplay;';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.style.position = 'absolute';
        // Append to container
        videoContainerRef.current.appendChild(iframe);
      }
    }
  }, [playingVideo]);

  // Function to destroy iframe
  const destroyIframe = () => {
    if (videoContainerRef.current) {
      // Find all iframe elements and remove them
      const iframes = videoContainerRef.current.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.remove();
      });
    }
    setPlayingVideo(null);
  };

  const trackEventHandler = (clickText: string, clickSource: string, custom?: object) => {
    trackEvent.click({
      clickType: 'click',
      clickText: clickText,
      clickSource: clickSource,
      custom: custom,
    });
  } 
  const handlePrev = () => {
    destroyIframe();
    trackEventHandler("prev_slide", pageTrackingSources.studentTestimonials);
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    destroyIframe();
    trackEventHandler("next_slide", pageTrackingSources.studentTestimonials);
    carouselRef.current?.next();
  };

  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
    destroyIframe();
  };

  const handleVideoPlay = (id: string, index: number, event: React.MouseEvent<HTMLDivElement>) => {
    trackEventHandler("video_play", pageTrackingSources.studentTestimonials, {
      title: testimonialData.find(item => item.id === id)?.alt,
      link: testimonialData.find(item => item.id === id)?.youtubeUrl,
    });
    // Only allow playing video if this is the active slide
    if (index === activeSlide) {
      videoContainerRef.current = event.currentTarget;
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
                <div 
                  className={`${styles.thumbnailContainer} ${activeSlide === index ? styles.activeThumbnail : ''}`}
                  onClick={(e) => handleVideoPlay(item.id, index, e)}
                >
                  <Image
                    src={item.thumbnailUrl.src}
                    alt={item.alt}
                    layout="fill"
                    objectFit="cover"
                    className={styles.thumbnail}
                  />
                </div>
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