import React from "react";

import { useUser } from "@hooks";

import ApplyButton from "../ApplyButton"; 
import styles from "./BottomNudge.module.scss";

export default function SstBottomNudge() {
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isloggedIn ?? false;

  return (
    <div className={styles.container}>
      {!isLoggedIn && (
        <div className={styles.text}>
          Admissions Open for <span>2025</span>
        </div>
      )}
      <ApplyButton />
    </div>
  );
}
