import React from "react";
import Image from "next/image";

import HorizontalScrollWrapper from "@components/common/HorizontalScroll";

import styles from "./PlacementTab.module.scss";
import VideoCardWithCta from "../VideoCardWithCta/VideoCardWithCta";
import { PlacementTabData } from "@modules/sst/career-outcomes/ui/Placement/data";

export default function PlacementTab({
  badge,
  cta,
  pointers,
  title,
  header,
  videoCards,
  images,
}: PlacementTabData) {
  return (
    <div className={styles.container}>
      <div className={styles.badge}>{badge}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.pointers}>
        {pointers.map((point) => {
          return (
            <div key={point.id} className={styles.point}>
              <div className={styles.pointTitle}>{point.title}</div>
              <div className={styles.pointDesc}>{point.desc}</div>
            </div>
          );
        })}
      </div>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.scrollView}>
        <HorizontalScrollWrapper slidesToShow={2.2}>
          {videoCards &&
            videoCards.map((video) => {
              return (
                <VideoCardWithCta
                  key={video.id}
                  title={video.title}
                  desc={video.desc}
                  thumbnail={video.thumbnail}
                  ctaText={video.ctaText}
                />
              );
            })}
          {images &&
            images.map((image) => {
              return (
                <Image
                  width={350}
                  height={200}
                  className={styles.image}
                  src={image.src}
                  alt=""
                />
              );
            })}
        </HorizontalScrollWrapper>
      </div>
      <div className={styles.cta}>
        {cta.text}
        <Image height={40} width={40} src={cta.icon} alt="" />
      </div>
    </div>
  );
}
