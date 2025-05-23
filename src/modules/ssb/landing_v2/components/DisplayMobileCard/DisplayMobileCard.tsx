import styles from "./DisplayMobileCard.module.scss";

import { Divider } from "antd";

export default function DisplayMobileCard() {
  return (
    <div className={styles.statusCard}>
      <div className={styles.card}>
        <div className={styles.cardTitle}>Bangalore</div>
        <div className={styles.cardDescription}>On-campus</div>
      </div>
      <Divider className={styles.divider} type="vertical" />
      <div className={styles.card}>
        <div className={styles.cardTitle}>18 Months </div>
        <div className={styles.cardDescription}>
          includes 3-month internship
        </div>
      </div>
    </div>
  );
}
