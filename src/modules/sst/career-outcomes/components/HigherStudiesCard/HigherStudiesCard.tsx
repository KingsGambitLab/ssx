"use client";

import { Modal } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

import { useState } from 'react';
import Image from 'next/image';

import { HigherStudiesCardProps } from '@modules/sst/career-outcomes/types';
import { pageTrackingEvents, pageTrackingSources, trackEvent } from '@modules/sst/career-outcomes/utils/tracking';

import HorizontalScrollWrapper from '@components/common/HorizontalScroll';

import styles from './HigherStudiesCard.module.scss';


export default function HigherStudiesCard({
  title,
  desc,
  icon,
  alt,
  featureList,
}: HigherStudiesCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<{ isOpen: boolean, imageUrl: string | null }>({ isOpen: false, imageUrl: null });
  
  const trackEventHandler = (clickText: string, custom?: object) => {
    trackEvent.click({
      clickType: 'click',
      clickText: clickText,
      clickSource: pageTrackingSources.higherStudiesCard,
      custom: custom,
    });
  }

  const openModal = (imageUrl: string) => {
    trackEventHandler(pageTrackingEvents.modalOpened, {
      text: alt,
      link: imageUrl
    });
    setIsModalOpen({isOpen: true, imageUrl});
  };
  const afterCloseModal = () => {
    trackEventHandler(pageTrackingEvents.modalClosed, {
      text: alt,
      link: isModalOpen.imageUrl
    });
    setIsModalOpen({isOpen: false, imageUrl: null});
  };

  const modalStyleClass = {
    mask: styles.imageModalMask
  }

  return (
    <>
      <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Image 
          src={icon} 
          alt={alt} 
          width={60} 
          height={60}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
        </div>

        {featureList && featureList?.length > 0  && (
            <HorizontalScrollWrapper
              slidesToScroll={1}
              slidesToShow={1.2}
              clickSource={pageTrackingSources.higherStudiesCard}
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
                <div className={styles.zoomIcon} onClick={() => openModal(item.image)}>
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
