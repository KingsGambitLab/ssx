"use client";
import Image from "next/image";
import React, { useState } from "react";

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from "@modules/sst/career-outcomes/utils/tracking";

import YoutubeModal from "@components/common/YouTubeModal";

import styles from "./VideoCard.module.scss";

type VideoCardProps = {
  thumbnail: string;
  content: string;
  footer: string;
  videoId: string;
};

export default function VideoCard({
  thumbnail,
  content,
  footer,
  videoId,
}: VideoCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleOpen = () => {
    setIsVideoOpen(true);
    trackEvent.click({
      clickType: 'click',
      clickText: pageTrackingEvents.videoPlayed,
      clickSource: pageTrackingSources.Entrepreneurship,
      custom: {
        link: `https://www.youtube.com/watch?v=${videoId}`,
      }
    })
  }
  
  const handleClose = () => {
    setIsVideoOpen(false);
    trackEvent.click({
      clickType: 'click',
      clickText: pageTrackingEvents.videoClosed,
      clickSource: pageTrackingSources.Entrepreneurship,
      custom: {
        link: `https://www.youtube.com/watch?v=${videoId}`,
      }
    })
  }

  return (
    <>
      <div className={styles.container}>
         <button
            className={styles.videoWrapper}
            onClick={handleOpen}
            aria-label="Play video"
          >
        <Image
          width={400}
          height={300}
          className={styles.thumbnail}
          src={thumbnail}
          alt="thumbnail"
        />
      </button>
      <div className={styles.content}>
        <div className={styles.body}>{content}</div>
        <div className={styles.footer}>{footer}</div>
      </div>
    </div>

    <YoutubeModal
      videoId={videoId || ""}
      isOpen={isVideoOpen}
      onClose={handleClose}
      width="50%"
      mobileWidth="100%"
      height="50vh"
      mobileHeight="50vh"
    />
    </>
  );
}
