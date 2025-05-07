import { Button } from "antd";
import classnames from "classnames";

import useUser from "@hooks/useUser";
import { useLoginModalContext } from "@context/sst/LoginModalContext";

import { pageTrackingEvents, trackEvent } from "@modules/sst/career-outcomes/utils/tracking";

import ArrowUpRightIcon from "@public/images/common/svg/arrow-up-right.svg";

import styles from './DownloadBrochure.module.scss';

const BROCHURE_LINK = "https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/109/378/original/SST_digital_brouchure_V3.pdf?1739770123";

type DownloadBrochureProps = {
  text?: string;
  brochureLink?: string;
  className?: string;
  buttonSize?: "large" | "middle" | "small";
  block?: boolean;
  trackEventSource?: string;
};

export default function DownloadBrochure(
  {
    text = "Download Brochure",
    brochureLink = BROCHURE_LINK,
    className = "",
    buttonSize = "middle",
    block = false,
    trackEventSource = ""
  }: DownloadBrochureProps) {
  
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isloggedIn;
  const { setIsLoginModalOpen } = useLoginModalContext();

  const trackEventHandler = () => {
    trackEvent.click({
      clickType: 'click',
      clickText: pageTrackingEvents.downloadBrochure,
      clickSource: trackEventSource,
      custom: {
        link: brochureLink,
      }
    })
  }

  const handleDownloadBrochureClick = () => {
    trackEventHandler();
    if (isLoggedIn && window !== undefined) {
      window.open(brochureLink, "_blank");
    } else {
      setIsLoginModalOpen(true, `${trackEventSource}_download_brochure`);
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