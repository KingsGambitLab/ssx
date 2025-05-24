import { Skeleton } from "antd";

import Header from "@modules/sst/application-form/components/Header";

import styles from "./FormSkeleton.module.scss";

export default function FormSkeleton() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Skeleton active paragraph={{ rows: 13 }} />
      </div>
    </div>
  );
}