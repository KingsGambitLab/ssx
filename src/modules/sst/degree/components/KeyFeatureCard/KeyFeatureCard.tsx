"use client";

import { Modal } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

import { useState } from 'react';
import Image from 'next/image';

import { KeyFeatureCardProps } from '@modules/sst/degree/types';
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/degree/utils/tracking';

import HorizontalScrollWrapper from '@components/common/HorizontalScroll';

import styles from './KeyFeatureCard.module.scss';

export default function KeyFeatureCard({
  title,
  desc,
  icon,
  alt,
  featureList,
}: KeyFeatureCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean,
    imageUrl: string | null,
    imageAlt: string | null
  }>({ isOpen: false, imageUrl: null, imageAlt: null });

  const openModal = (imageUrl: string, imageAlt: string) => {
    trackEvent.click({
      clickType: pageTrackingEvents.modalOpened,
      clickText: pageTrackingEvents.modalOpened,
      clickSource: pageTrackingSources.keyFeatureCard,
      custom: {
        text: imageAlt,
        link: imageUrl
      }
    });
    setIsModalOpen({isOpen: true, imageUrl, imageAlt});
  };
  const afterCloseModal = () => {
    trackEvent.click({
      clickType: pageTrackingEvents.modalClosed,
      clickText: pageTrackingEvents.modalClosed,
      clickSource: pageTrackingSources.keyFeatureCard,
      custom: {
        text: isModalOpen.imageAlt || '',
        link: isModalOpen.imageUrl || ''
      }
    });
    setIsModalOpen({isOpen: false, imageUrl: null, imageAlt: null});
  };

  const modalStyleClass = {
    mask: styles.imageModalMask
  }

  return (
    <>
      <div className={styles.container}>
      <Image
        src={icon}
        alt={alt}
        width={60}
        height={60}
        className={styles.icon}
      />

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
        </div>

        {featureList && featureList?.length > 0  && (
            <HorizontalScrollWrapper
              slidesToScroll={1}
              slidesToShow={1.2}
              clickSource={pageTrackingSources.keyFeatureCard}
            >
            {featureList.map((item, index) => (
              <div key={index} className={styles.featureListItem}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={271}
                  height={264}
                  className={styles.featureListItemImage}
                />
                <div className={styles.zoomIcon} onClick={() => openModal(item.image, item.alt)}>
                  <ZoomInOutlined className={styles.zoomIconIcon} />
                </div>
              </div>
            ))}
          </HorizontalScrollWrapper>
        )}
      </div>
    </div>

    <Modal
        centered
        open={isModalOpen.isOpen}
        onCancel={() => setIsModalOpen(prev => ({ ...prev, isOpen: false }))}
        afterClose={afterCloseModal}
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
}
