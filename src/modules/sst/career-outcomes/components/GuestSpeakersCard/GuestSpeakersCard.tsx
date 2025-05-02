"use client";

import { useState } from "react";
import Image from "next/image";

import { GuestSpeakersCardProps } from "../../types";
import YoutubeModal from "@components/common/YouTubeModal";

import styles from "./GuestSpeakersCard.module.scss";

export default function GuestSpeakersCard({ thumbnail, videoLink, desc }: GuestSpeakersCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className={styles.container}>
        {thumbnail && (
          <button className={styles.imageWrapper} onClick={handleOpen} aria-label="Play video">
            <Image
              src={thumbnail}
              alt=""
              width={370}
              height={201}
              className={styles.image}
            />
          </button>
        )}
        <div className={styles.content}>
          <div className={styles.desc}>{desc}</div>
        </div>
      </div>

      <YoutubeModal
        videoId={videoLink}
        isOpen={isOpen}
        onClose={handleClose}
        width="50%"
        mobileWidth="100%"
        height="50vh"
        mobileHeight="50vh"
      />
    </>
  );
}
