import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

import { useDeviceType } from '@hooks/useDeviceType';

import styles from './YouTubeModal.module.scss';

interface YouTubeModalProps {
  videoId: string;
  videoLink?: string;
  isOpen: boolean;
  onClose: () => void;
  width?: number | string;
  height?: number | string;
  mobileWidth?: number | string;
  mobileHeight?: number | string;
}

const YouTubeModal: React.FC<YouTubeModalProps> = ({
  videoId,
  videoLink,
  isOpen,
  onClose,
  width = '40%',
  height = '40vh',
  mobileWidth = '90%',
  mobileHeight = '50vh',
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { isMobile } = useDeviceType();

  // Only load the iframe when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(true);
    } else {
      // Optional: Reset iframe when modal closes to free up resources
      // Uncomment if you want to completely unload the iframe when closed
      // setTimeout(() => setIframeLoaded(false), 300);
    }
  }, [isOpen]);

  // Construct the YouTube embed URL with autoplay
  const youtubeEmbedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : videoLink;

  console.log("youtubeEmbedUrl", youtubeEmbedUrl);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={isMobile ? mobileWidth : width}
      centered
      closable={false}
      destroyOnClose
      className={styles.videoModal}
      maskClosable={true}
    >
      <div className={styles.videoContainer} style={{ height: isMobile ? mobileHeight : height }}>
        {iframeLoaded && (
          <iframe
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoFrame}
            loading="lazy"
          ></iframe>
        )}
      </div>
    </Modal>
  );
};

export default YouTubeModal; 