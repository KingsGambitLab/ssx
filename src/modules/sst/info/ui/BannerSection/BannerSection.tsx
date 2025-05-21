import React from "react";

import styles from "./BannerSection.module.scss";
import Section from "@components/common/Section";
import { BANNER_CARDS, LOGOS } from "./data";
import BannerCard from "@modules/sst/info/components/BannerCard";
import Image from "next/image";

export default function BannerSection() {
  return (
    <Section>
      <div className={styles.bgImage}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>India's Ivy League</span> <br /> for Computer Science
            Engineering
          </div>
          <div className={styles.subtitle}>
            Industry-integrated Undergraduate Programme Built by Leaders from
          </div>
          <div className={styles.logos}>
            {LOGOS.map(({ src, alt }) => {
              return (
                <Image
                  height={20}
                  width={20}
                  className={styles.logoIcon}
                  src={src}
                  alt={alt}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.bannerCards}>
          {BANNER_CARDS.map((card, index) => {
            return (
              <BannerCard
                key={index}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
              />
            );
          })}
        </div>
      </div>
    </Section>
  );
}
