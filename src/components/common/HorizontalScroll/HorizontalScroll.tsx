import { Button } from 'antd';
import { useRef, useEffect, useState } from 'react';

import classNames from 'classnames';

import ArrowLeft from '@public/images/common/svg/arrow-left-active.svg';
import ArrowLeftDisabled from '@public/images/common/svg/arrow-left-disable.svg';
import ArrowRight from '@public/images/common/svg/arrow-right-active.svg';
import ArrowRightDisabled from '@public/images/common/svg/arrow-right-disable.svg';

import styles from './HorizontalScroll.module.scss';

export default function HorizontalScrollWrapper({
  children,
  slidesToScroll = 1,
  slidesToShow = 1,
  slideItemMinWidth,
  scrollContainerClassName,
  scrollControlsClassName,
}: {
  children: React.ReactNode,
  slidesToScroll?: number,
  slidesToShow?: number,
  slideItemMinWidth?: number,
  scrollContainerClassName?: string,
  scrollControlsClassName?: string,
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  const updateScrollItemsWidth = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;

      let itemWidthPercent = 100 / slidesToShow;
      
      if (slideItemMinWidth) {
        const containerWidth = container.clientWidth;
        
        const itemsToShow = Math.floor(containerWidth / slideItemMinWidth);
        const actualItemsToShow = Math.min(itemsToShow, slidesToShow);
      
        itemWidthPercent = 100 / actualItemsToShow;
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
  }, [slidesToShow, children, slideItemMinWidth]);

  const nextSlide = () => {
    if (carouselRef.current) {
      const scrollContainer = carouselRef.current;
      const childWidth = (scrollContainer.firstChild as HTMLElement)?.offsetWidth || 0;
      const scrollAmount = childWidth * slidesToScroll;
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
    setTimeout(updateScrollButtons, 500);
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const scrollContainer = carouselRef.current;
      const childWidth = (scrollContainer.firstChild as HTMLElement)?.offsetWidth || 0;
      const scrollAmount = childWidth * slidesToScroll;
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
    setTimeout(updateScrollButtons, 500);
  };

  return (
    <div className={styles.container}>
      <div
        ref={carouselRef}
        className={classNames(styles.scrollContainer, scrollContainerClassName)}
      >
        {children}
      </div>
      <div className={classNames(styles.scrollButtons, scrollControlsClassName)}>
        <Button
          className={styles.scrollButton}
          onClick={prevSlide}
          color="default"
          variant="solid"
          shape="circle"
          disabled={isAtStart}
          icon={<img src={isAtStart ? ArrowLeftDisabled.src : ArrowLeft.src} alt="arrow-left" className={styles.scrollButtonIcon} />}
        />
        <Button
          className={styles.scrollButton}
          onClick={nextSlide}
          color="default"
          variant="solid"
          shape="circle"
          disabled={isAtEnd}
          icon={<img src={isAtEnd ? ArrowRightDisabled.src : ArrowRight.src} alt="arrow-right" className={styles.scrollButtonIcon} />}
        />
      </div>
    </div>
  );
}
