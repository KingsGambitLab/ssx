import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        National Scholarship and Eligibility Test
      </div>
      <div className={styles.subheading}>
        <div className={styles.year}>2025</div>
        <div className={styles.divider} />
      </div>
    </div>
  );
}