"use client";

import { Modal } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

import { useState } from 'react';
import Image from 'next/image';

import { KeyFeatureCardProps } from '@modules/sst/degree/types';

import { useDeviceType } from '@hooks/useDeviceType';

import HorizontalScrollWrapper from '@components/common/HorizontalScroll';

import styles from './KeyFeatureCard.module.scss';

export default function KeyFeatureCard({
  title,
  desc,
  icon,
  alt,
  featureList,
}: KeyFeatureCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => setSelectedImage(imageUrl);
  const closeModal = () => setSelectedImage(null);

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
            <HorizontalScrollWrapper slidesToScroll={1} slidesToShow={1.2}>
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
        open={!!selectedImage}
        onCancel={closeModal}
        footer={null}
        classNames={modalStyleClass}
        className={styles.imageModal}
      >
        {selectedImage && (
          <Image
            src={selectedImage}
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
