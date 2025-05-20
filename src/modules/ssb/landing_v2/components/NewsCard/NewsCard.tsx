import styles from "./NewsCard.module.scss";
import Image, { StaticImageData } from "next/image";

interface NewsCardProps {
  imageSrc: StaticImageData;
  boldText: string;
  text: string;
}

export default function NewsCard({ imageSrc, boldText, text }: NewsCardProps) {
  return (
    <div className={styles.newsCard}>
      <Image
        src={imageSrc}
        alt="News Image"
        className={styles.newsCardImage}
        width={0}
        height={0}
        sizes="100%"
        style={{ width: "100%", height: "auto" }}
        priority
      />
      <div className={styles.newsCardText}>
        <div className={styles.newsCardTextBold}>
          {boldText}
          <span className={styles.newsCardTextNormal}>{text}</span>
        </div>
      </div>
    </div>
  );
}
