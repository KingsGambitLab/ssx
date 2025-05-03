"use client";

import { Button } from "antd";
import { useState } from "react";
import Image from "next/image";

import { SuccessStoryCardProps } from "@modules/sst/career-outcomes/types";
import YoutubeModal from "@components/common/YouTubeModal";

import styles from "./SuccessStoryCard.module.scss";

export default function SuccessStoryCard({
  thumbnail,
  title,
  desc,
  videoId,
  videoLink,
  link,
  ctaText,
  isVideoCard = false,
}: SuccessStoryCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleOpen = () => setIsVideoOpen(true);
  const handleClose = () => setIsVideoOpen(false);

  return (
    <>
      <div className={styles.container}>
      {thumbnail &&
        (isVideoCard ? (
          <button
            className={styles.videoWrapper}
            onClick={handleOpen}
            aria-label="Play video"
          >
            <Image
              src={thumbnail}
              alt={title}
              width={357}
              height={201}
              className={styles.videoThumbnail}
            />
          </button>
        ) : (
          <Image
            src={thumbnail}
            alt={title}
            width={357}
            height={201}
            className={styles.projectImage}
          />
        ))}

      <div className={styles.content}>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={() => window.open(link, "_blank")}
          className={styles.ctaButton}
        >
          {ctaText}
        </Button>
      </div>
    </div>

    {isVideoCard && (
      <YoutubeModal
        videoId={videoId || ""}
        videoLink={videoLink || ""}
        isOpen={isVideoOpen}
        onClose={handleClose}
        width="50%"
        mobileWidth="100%"
        height="50vh"
        mobileHeight="50vh"
      />
    )}
    </>
  );
}
