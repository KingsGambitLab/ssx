'use client';

import { useState } from 'react';
import Image from 'next/image';

import classNames from 'classnames';
import { Modal } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

import { useDeviceType } from '@hooks/useDeviceType';

import { SstVsTraditionalCardProps } from '@modules/sst/degree/types';
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/degree/utils/tracking';

import HorizontalScrollWrapper from '@components/common/HorizontalScroll/HorizontalScroll';

import styles from './SstVsTraditionalCard.module.scss';


const ArticlesCard = ({ articles }: { articles: SstVsTraditionalCardProps['articles'] }) => {
  const { isMobile } = useDeviceType();
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean,
    imageUrl: string | null,
    imageAlt: string | null
  }>({ isOpen: false, imageUrl: null, imageAlt: null });

  const openModal = (imageUrl: string, alt: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.modalOpened,
      clickText: pageTrackingEvents.modalOpened,
      clickSource: pageTrackingSources.sstVsTraditionalCard,
      custom: {
        text: alt,
        link: imageUrl
      }
    });
    setIsModalOpen({ isOpen: true, imageUrl, imageAlt: alt });
  };

  const closeModal = () => {
    trackEvent.click({
      clickType: pageTrackingEvents.modalClosed,
      clickText: pageTrackingEvents.modalClosed,
      clickSource: pageTrackingSources.sstVsTraditionalCard,
      custom: {
        text: isModalOpen.imageAlt || '',
        link: isModalOpen.imageUrl || ''
      }
    });
    setIsModalOpen({ isOpen: false, imageUrl: null, imageAlt: null });
  };

  const modalStyleClass = {
    mask: styles.imageModalMask
  }

  return (
    <>
      {articles?.map((article, index) => {
        const isTextCard = !!article?.text;

        if (!isTextCard) {
          return (
            <div key={index} className={styles.articleImageCard}>
              <Image
                src={article.image}
                alt={article.alt}
                width={300}
                height={324}
              />
              <div className={styles.zoomIcon} onClick={() => openModal(article.image, article.alt)}>
                <ZoomInOutlined className={styles.zoomIconIcon} />
              </div>
            </div>
          );
        } else if (!isMobile) {
          return (
            <div key={index} className={styles.articleTextCard}>
              <Image
                src={article.image}
                alt={article.alt}
                width={300}
                height={190}
              />
              <div className={styles.articleText}>
                {article.text}
              </div>
            </div>
          );
        }

        return null;
      })}

      <Modal
        centered
        open={isModalOpen.isOpen}
        onCancel={() => setIsModalOpen(prev => ({ ...prev, isOpen: false }))}
        afterClose={closeModal}
        footer={null}
        classNames={modalStyleClass}
        className={styles.imageModal}
      >
        {isModalOpen?.imageUrl && (
          <Image
            src={isModalOpen?.imageUrl}
            alt="Zoomed Image"
            className={styles.zoomedArticleImage}
            width={319}
            height={625}
          />
        )}
      </Modal>
    </>
  );
};

export default function SstVsTraditionalCard({
  icon,
  altIcon,
  title,
  points,
  articles,
  variant,
}: SstVsTraditionalCardProps) {
  const { isMobile } = useDeviceType();

  const isTextCard = articles?.some(article => article?.text);
  const isRedVariant = variant === 'red';
  const isBlueVariant = variant === 'blue';

  const parseHtmlTags = (text: string): React.ReactNode => {
    if (!text) return null;
  
    const parts = text.split(/(<b>.*?<\/b>)/g);
  
    return parts.map((part, index) => {
      if (part.startsWith('<b>') && part.endsWith('</b>')) {
        const content = part.replace(/<\/?b>/g, '');
        return (
          <span key={index} className={styles.highlight}>
            {content}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={icon}
          alt={altIcon}
          width={60}
          height={60}
          className={styles.icon}
        />

        <div className={styles.infoWrapper}>
          <div className={styles.keyPointsWrapper}>
            <div className={classNames(
              styles.title,
              { [styles.redTitle]: isRedVariant },
              { [styles.blueTitle]: isBlueVariant }
            )}>
              {title}
            </div>

            <div className={styles.keyPoints}>
              {points.map((point, index) => (
                <div key={index} className={styles.keyPoint}>
                  <div className={styles.keyPointHeading}>{parseHtmlTags(point.heading)}</div>

                  {point.subHeading && (
                    <div className={styles.keyPointSubHeading}>
                      {Array.isArray(point.subHeading) ? (
                        <ul className={styles.orderedList}>
                          {point.subHeading.map((subPoint, subIndex) => (
                            <li key={subIndex} className={styles.listItem}>
                              {subPoint}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div>{parseHtmlTags(point.subHeading)}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {(!isTextCard || !isMobile) && (
            <HorizontalScrollWrapper
              slidesToScroll={1}
              slidesToShow={isMobile ? 1.2 : 1.8}
              clickSource={pageTrackingSources.sstVsTraditionalCard}
            >
              <ArticlesCard articles={articles} />
            </HorizontalScrollWrapper>
          )}
        </div>
      </div>
    </div>
  );
}
