"use client";
import { Button } from 'antd';
import { useRef, useEffect, useState } from 'react';

import { useDeviceType } from '@hooks/useDeviceType';

import { trackEvent } from "@modules/sst/degree/utils/tracking";
import { TrackingProps } from "@modules/sst/degree/types";

import classNames from 'classnames';
import ArrowLeft from '@public/images/common/svg/arrow-left-black.svg';
import ArrowRight from '@public/images/common/svg/arrow-right-black.svg';

import styles from './CarouselWrapper.module.scss';

export default function CarouselWrapper({
  children,
  slidesToScrollInDesktop = 1,
  slidesToShowInDesktop = 1,
  slideItemMinWidthInDesktop,
  slidesToScrollInMobile = 1,
  slidesToShowInMobile = 1,
  slideItemMinWidthInMobile,
  scrollContainerClassName,
  scrollControlsClassName,
  showInMobileOnly = false,
  trackEventSource = "",
}: {
  children: React.ReactNode,
  slidesToScrollInDesktop?: number,
  slidesToShowInDesktop?: number,
  slideItemMinWidthInDesktop?: number,
  slidesToScrollInMobile?: number,
  slidesToShowInMobile?: number,
  slideItemMinWidthInMobile?: number,
  scrollContainerClassName?: string,
  scrollControlsClassName?: string,
  showInMobileOnly?: boolean,
  trackEventSource?: string,
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const dotCountRef = useRef(dotCount);

  const { isMobile } = useDeviceType();

  useEffect(() => {
    dotCountRef.current = dotCount;
  }, [dotCount]);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth, children } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);

      const child = children[0] as HTMLElement;
      const childWidth = child?.offsetWidth || 1;
      const slidesToScroll = isMobile ? slidesToScrollInMobile : slidesToScrollInDesktop;
      const index = Math.round(scrollLeft / (childWidth * slidesToScroll));

      setActiveIndex(Math.min(index, dotCountRef.current - 1));
    }
  };

  const updateScrollItemsWidth = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;

      const slidesToShow = isMobile ? slidesToShowInMobile : slidesToShowInDesktop;
      const slideItemMinWidth = isMobile ? slideItemMinWidthInMobile : slideItemMinWidthInDesktop;

      let itemWidthPercent = 100 / slidesToShow;

      if (slideItemMinWidth) {
        const containerWidth = container.clientWidth;
        const itemsToShow = containerWidth / slideItemMinWidth;
        const actualItemsToShow = parseFloat(itemsToShow.toFixed(1));

        itemWidthPercent = 100 / actualItemsToShow;
        setDotCount(Math.ceil(container.children.length / actualItemsToShow));
      } else {
        setDotCount(Math.ceil(container.children.length / slidesToShow));
      }

      const children = container.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        child.style.minWidth = `${itemWidthPercent}%`;
        child.style.maxWidth = `${itemWidthPercent}%`;
        child.style.flex = '0 0 auto';
      }
    }
  };

  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
    }

    updateScrollItemsWidth();
    window.addEventListener('resize', updateScrollItemsWidth);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      }
      window.removeEventListener('resize', updateScrollItemsWidth);
    };
  }, [slidesToShowInDesktop, slidesToShowInMobile, children, slideItemMinWidthInDesktop, slideItemMinWidthInMobile, isMobile]);

  const trackScrollEvent = ({ clickText, custom }: TrackingProps) => {
    trackEvent.click({
      clickType: 'horizontal_scroll',
      clickText,
      clickSource: trackEventSource || '',
      custom,
    });
  }


  const nextSlide = () => {
    if (carouselRef.current) {
      const scrollContainer = carouselRef.current;
      const childWidth = (scrollContainer.firstChild as HTMLElement)?.offsetWidth || 0;
      const scrollAmount = childWidth * (isMobile ? slidesToScrollInMobile : slidesToScrollInDesktop);
      scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      trackScrollEvent({ clickText: 'next_slide'});
    }
    setTimeout(updateScrollButtons, 500);
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const scrollContainer = carouselRef.current;
      const childWidth = (scrollContainer.firstChild as HTMLElement)?.offsetWidth || 0;
      const scrollAmount = childWidth * (isMobile ? slidesToScrollInMobile : slidesToScrollInDesktop);
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });

      trackScrollEvent({ clickText: 'prev_slide'});
    }
    setTimeout(updateScrollButtons, 500);
  };

  if (showInMobileOnly && !isMobile) {
    return children;
  }

  return (
    <div className={classNames(styles.container, {
      [styles.hideLeftOverlay]: isAtStart,
      [styles.hideRightOverlay]: isAtEnd,
    })}>
      <div
        ref={carouselRef}
        className={classNames(styles.scrollContainer, scrollContainerClassName)}
      >
        {children}
      </div>

      <div className={classNames(styles.scrollButtons, scrollControlsClassName)}>
        <Button
          className={classNames(styles.scrollButtonLeft, {
            [styles.hideButton]: isAtStart,
          })}
          onClick={prevSlide}
          color="default"
          variant="solid"
          shape="circle"
          disabled={isAtStart}
          icon={<img src={ArrowLeft.src} alt="arrow-left" className={styles.scrollButtonIcon} />}
        />
        <Button
          className={classNames(styles.scrollButtonRight, {
            [styles.hideButton]: isAtEnd,
          })}
          onClick={nextSlide}
          color="default"
          variant="solid"
          shape="circle"
          disabled={isAtEnd}
          icon={<img src={ArrowRight.src} alt="arrow-right" className={styles.scrollButtonIcon} />}
        />
      </div>

      <div className={styles.dots}>
        {Array.from({ length: dotCount }).map((_, index) => (
          <span
            key={index}
            className={classNames(styles.dot, {
              [styles.activeDot]: index === activeIndex,
            })}
          ></span>
        ))}
      </div>
    </div>
  );
}
