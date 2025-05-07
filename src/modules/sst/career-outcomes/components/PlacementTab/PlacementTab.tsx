import React from "react";
import Image from "next/image";
import { Button } from "antd";

import { useDeviceType } from "@hooks/useDeviceType";

import HorizontalScrollWrapper from "@components/common/HorizontalScroll";
import DownloadBrochure from "@components/Sst/DownloadBrochure/DownloadBrochure";
import DownloadReport from "@components/Sst/DownloadReport/DownloadReport";
import VideoCardWithCta from "../VideoCardWithCta/VideoCardWithCta";

import { PlacementTabData } from "@modules/sst/career-outcomes/ui/Placement/data";
import { trackEvent, pageTrackingSources } from "@modules/sst/career-outcomes/utils/tracking";

import ArrowUpRightIcon from "@public/images/common/svg/arrow-up-right.svg";

import styles from "./PlacementTab.module.scss";

const PlacmentTabCta = ({ cta }: { cta: PlacementTabData["cta"] }) => {
  if (cta.type === "DownloadBrochure") {
    return (
      <DownloadBrochure
        text="Download Brochure"
        brochureLink={cta?.brochureLink}
        buttonSize="large"
        className={styles.downloadBrochureButton}
        trackEventSource={pageTrackingSources.placementTab}
      />
    );
  }

  if (cta.type === "PlacementReport") {
    return (
      <DownloadReport
        text="Download Placement Report*"
        buttonSize="large"
        className={styles.downloadReportButton}
        trackEventSource={pageTrackingSources.placementTab}
      />
    );
  }

  return (
    <Button
      type="primary"
      size="large"
      className={styles.cta}
      block={true}
      iconPosition="end"
      icon={<img src={ArrowUpRightIcon.src} alt="arrow-up-right" />}
      onClick={() => {
        trackEvent.click({
          clickType: 'click',
          clickText: cta.text,
          clickSource: pageTrackingSources.placementTab,
          custom: {
            link: cta.link,
          }
        })
        window.open(cta.link, "_blank")
      }}
    >
      {cta.text}
    </Button>
  );
};

export default function PlacementTab({
  badge,
  cta,
  pointers,
  title,
  header,
  videoCards,
  images,
}: PlacementTabData) {
  const { isMobile } = useDeviceType();
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
        <HorizontalScrollWrapper slidesToShow={isMobile ? 1.1 : 2.5} clickSource={pageTrackingSources.placementTab}>
          {videoCards &&
            videoCards.map((video) => {
              return (
                <VideoCardWithCta
                  key={video.id}
                  title={video.title}
                  desc={video.desc}
                  thumbnail={video.thumbnail}
                  ctaText={video.ctaText}
                  link={video.link}
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

      
      <div className={styles.ctaContainer}>
        <PlacmentTabCta cta={cta} />
          {badge === "Eligibility" && (
            <div className={styles.footerText}>
              Scaler’s Online Program Placement Report*
            </div>
          )}
      </div>
    </div>
  );
}
