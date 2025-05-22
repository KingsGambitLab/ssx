"use client";
import React from "react";
import Image from "next/image";

import { BANNER_CARDS, HEADER, LOGOS } from "./data";
import { useDeviceType } from "@hooks/useDeviceType";

import BannerCard from "@modules/sst/info/components/BannerCard";
import Section from "@components/common/Section";
import LoginForm from "@modules/sst/application-form/ui/LoginForm";

import styles from "./BannerSection.module.scss";

export default function BannerSection() {
  const { isMobile } = useDeviceType();

  return (
    <Section>
      <div className={styles.bgImage}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>{HEADER.title}</div>
          <div className={styles.subtitle}>{HEADER.subtitle}</div>
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
        {isMobile && (<LoginForm />)}
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
