import React from "react";

import { Button } from "antd";

import styles from "./ActionButton.module.scss";

interface ApplyActionsProps {
  isLoggedIn: boolean;
  onApply: () => void;
  onResumeApplication: () => void;
}

export default function ActionButton({
  isLoggedIn,
  onApply,
  onResumeApplication,
}: ApplyActionsProps) {
  if (isLoggedIn) {
    return (
      <Button
        size="large"
        color="primary"
        variant="solid"
        className={styles.resumeApplicationBtn}
        onClick={onResumeApplication}
      >
        Resume Application
      </Button>
    );
  }
  return (
    <Button
      size="large"
      color="danger"
      variant="solid"
      className={styles.applyBtn}
      onClick={onApply}
    >
      Apply Now
    </Button>
  );
}
