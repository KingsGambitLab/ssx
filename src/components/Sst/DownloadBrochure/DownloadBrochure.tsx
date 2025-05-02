import { Button } from "antd";
import classnames from "classnames";

import useUser from "@hooks/useUser";
import { useLoginModalContext } from "@context/sst/LoginModalContext";

import ArrowUpRightIcon from "@public/images/common/svg/arrow-up-right.svg";

import styles from './DownloadBrochure.module.scss';

type DownloadBrochureProps = {
  text?: string;
  brochureLink?: string;
  className?: string;
  buttonSize?: "large" | "middle" | "small";
  block?: boolean;
};

export default function DownloadBrochure(
  {
    text = "Download Brochure",
    brochureLink = "",
    className = "",
    buttonSize = "middle",
    block = false
  }: DownloadBrochureProps) {
  
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isloggedIn;
  const { setIsLoginModalOpen } = useLoginModalContext();

  const handleDownloadBrochureClick = () => {
    if (isLoggedIn && window !== undefined) {
      window.open(brochureLink, "_blank");
    } else {
      setIsLoginModalOpen(true);
    }
  };
  
  return (
    <Button
      type="primary"
      size={buttonSize}
      className={classnames(styles.downloadBrochureButton, className)}
      block={block}
      iconPosition="end"
      icon={<img src={ArrowUpRightIcon.src} alt="arrow-up-right" />}
      onClick={handleDownloadBrochureClick}
    >
      {text}
    </Button>
  );
}