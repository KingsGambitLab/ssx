import Image from "next/image";

import styles from "./Banner.module.scss";

export default function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          Welcome to Student Directory of <span>Scaler School of Technology</span>
        </h1>
        <h2 className={styles.subheading}>
          Connect with the Students to learn more about SST
        </h2>
      </div>
      <div className={styles.bannerImg}>
        <Image
          src="/images/sst/webp/banner.webp"
          alt="SST Banner"
          height={230}
          width={520}
          className={styles.desktopBanner}
        />
        <Image
          src="/images/sst/webp/banner-mweb.webp"
          alt="SST Banner Mobile"
          height={160}
          width={212}
          className={styles.mobileBanner}
        />
      </div>
    </div>
  )
}