import React, { useState } from "react";
import Image from "next/image";

import YoutubeModal from "@components/common/YouTubeModal";

import styles from "./VideoCardWithDesc.module.scss";

type VideoCardWithDescProps = {
  thumbnail: string;
  title: string;
  desc: string;
  videoId: string;
};

export default function VideoCardWithDesc({
  thumbnail,
  title,
  desc,
  videoId,
}: VideoCardWithDescProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpen = () => setIsVideoModalOpen(true);
  const handleClose = () => setIsVideoModalOpen(false);
  
  return (
    <>
      <div className={styles.container}>
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
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
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
