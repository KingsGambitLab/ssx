import Image from "next/image";

import { GuestSpeakersCardProps } from "../../types";

import styles from "./GuestSpeakersCard.module.scss";

export default function GuestSpeakersCard({ thumbnail, videoLink, desc }: GuestSpeakersCardProps) {
  return (
    <div className={styles.container}>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt=""
          width={357}
          height={201}
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <div className={styles.desc}>
          {desc}
        </div>
      </div>
    </div>
  );
}