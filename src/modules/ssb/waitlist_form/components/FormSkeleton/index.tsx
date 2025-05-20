import React from "react";
import { Skeleton } from "antd";

import styles from "./index.module.scss";

export default function FormSkeleton() {
  console.log("FormSkeleton");

  return (
    <div className={styles.formSkeleton}>
      <Skeleton active paragraph={{ rows: 10 }} />
    </div>
  );
}
