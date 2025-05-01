"use client";

import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from "./ApplyButton.module.scss";
import useUser from "@hooks/useUser";
import { useLoginModalContext } from "@context/sst/LoginModalContext";

interface ApplyButtonProps {
  text?: string;
  resumeText?: string;
  className?: string;
  size?: 'large' | 'middle' | 'small';
  showIcon?: boolean;
  block?: boolean;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  text = "Apply Now",
  resumeText = "Resume Application",
  className = "",
  size = "middle",
  showIcon = false,
  block = false,
}) => {
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isloggedIn;
  const { setIsLoginModalOpen } = useLoginModalContext();


  const onApplyHandler = () => {
    setIsLoginModalOpen(true);
  };

  const onResumeApplicationHandler = () => {
    window.open("/school-of-technology/application/");
  };

  if (isLoggedIn) {
    return (
      <Button
        size={size}
        type="primary"
        className={`${styles.resumeButton} ${className}`}
        onClick={onResumeApplicationHandler}
        block={block}
      >
        {resumeText}
      </Button>
    );
  }

  return (
    <Button
      size={size}
      type="primary"
      className={`${styles.applyButton} ${className}`}
      onClick={onApplyHandler}
      block={block}
    >
      {text} {showIcon && <ArrowRightOutlined />}
    </Button>
  );
};

export default ApplyButton; 