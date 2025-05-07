import React, { useState } from "react";
import Image from "next/image";
import classnames from "classnames";
import YoutubeModal from "@components/common/YouTubeModal";

import { pageTrackingEvents, trackEvent } from "@modules/sst/career-outcomes/utils/tracking";

import styles from "./VideoCardWithDesc.module.scss";

type VideoCardWithDescProps = {
  thumbnail: string;
  title: string;
  desc: string;
  videoId: string;
  trackEventSource: string;
  containerClass?: string;
  titleClass?: string;
  descClass?: string;
};

export default function VideoCardWithDesc({
  thumbnail,
  title,
  desc,
  videoId,
  trackEventSource,
  containerClass,
  titleClass = '',
  descClass = '',
}: VideoCardWithDescProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const trackEventHandler = (clickText: string) => {
    trackEvent.click({
      clickType: 'click',
      clickText: clickText,
      clickSource: trackEventSource,
      custom: {
        title: title,
        link: `https://www.youtube.com/watch?v=${videoId}`,
      }
    })
  }

  const handleOpen = () => {
    trackEventHandler(pageTrackingEvents.videoPlayed);
    setIsVideoModalOpen(true);
  }
  const handleClose = () => {
    trackEventHandler(pageTrackingEvents.videoClosed);
    setIsVideoModalOpen(false);
  }
  return (
    <>
      <div className={`${styles.container} ${containerClass}`}>
          <button
            className={styles.videoWrapper}
            onClick={handleOpen}
            aria-label="Play video"
          >
          <Image
            width={350}
            height={200}
            className={styles.image}
            src={thumbnail}
            alt={"video-thumbnail"}
          />
        </button>
        {(title || desc) && (
          <div className={styles.content}>
            {title && <div className={classnames(styles.title, titleClass)}>{title}</div>}
            {desc && <div className={classnames(styles.desc, descClass)}>{desc}</div>}
          </div>
        )}
    </div>

    <YoutubeModal
      videoId={videoId || ""}
      isOpen={isVideoModalOpen}
      onClose={handleClose}
      width="50%"
      mobileWidth="100%"
      height="50vh"
      mobileHeight="50vh"
    />
    </>
  );
}
