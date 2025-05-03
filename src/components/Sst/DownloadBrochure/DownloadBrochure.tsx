import { Button } from "antd";
import classnames from "classnames";

import useUser from "@hooks/useUser";
import { useLoginModalContext } from "@context/sst/LoginModalContext";

import ArrowUpRightIcon from "@public/images/common/svg/arrow-up-right.svg";

import styles from './DownloadBrochure.module.scss';

const BROCHURE_LINK = "https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/109/378/original/SST_digital_brouchure_V3.pdf?1739770123";

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
    brochureLink = BROCHURE_LINK,
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