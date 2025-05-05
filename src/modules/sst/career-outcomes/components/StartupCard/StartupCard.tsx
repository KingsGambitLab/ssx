"use client";

import { Button } from "antd";
import Image from "next/image";

import { pageTrackingEvents, pageTrackingSources, trackEvent } from "@modules/sst/career-outcomes/utils/tracking";
import { StartupCardProps } from "../../types";

import ArrowUpRight from "@public/images/common/svg/arrow-up-right-black.svg";

import styles from "./StartupCard.module.scss";

export default function StartupCard({ image, name, desc, cta_text, link }: StartupCardProps) {

  const ctaClickHandler = (name: string, link: string) => {
    trackEvent.click({
      clickType: 'click',
      clickText: pageTrackingEvents.ctaClicked,
      clickSource: pageTrackingSources.startups,
      custom: {
        name: name,
        link: link,
      },
    });
    window.open(link, "_blank");
  }
  return (
    <div className={styles.container}>
      {image &&
        <Image
          src={image}
          alt={name}
          height={357}
          width={201}
          className={styles.projectImage}
        />
      }

      <div className={styles.content}>
        <div className={styles.infoWrapper}>
          <div className={styles.name}>
            {name}
          </div>
          <div className={styles.desc}>
            {desc}
          </div>
        </div>

        <Button
          type="primary"
          onClick={() => ctaClickHandler(name, link)}
          className={styles.ctaButton}
          iconPosition="end"
          icon={<img src={ArrowUpRight.src} alt="arrow-up-right" />}
          block
        >
          {cta_text}
        </Button>
      </div>
    </div>
  );
}