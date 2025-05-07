import { Button } from "antd";
import classnames from "classnames";

import useUser from "@hooks/useUser";
import { useLoginModalContext } from "@context/sst/LoginModalContext";

import { trackEvent, pageTrackingEvents } from "@modules/sst/career-outcomes/utils/tracking";

import ArrowUpRightIcon from "@public/images/common/svg/arrow-up-right.svg";

import styles from './DownloadReport.module.scss';

const REPORT_LINK = "https://content.interviewbit.com/scaler_career_transition_assesment_report-academy.pdf";

type DownloadReportProps = {
  text?: string;
  brochureLink?: string;
  className?: string;
  buttonSize?: "large" | "middle" | "small";
  block?: boolean;
  trackEventSource?: string;
};

export default function DownloadReport(
  {
    text = "Download Report",
    brochureLink = REPORT_LINK,
    className = "",
    buttonSize = "middle",
    block = false,
    trackEventSource = ""
  }: DownloadReportProps) {
  
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

  const handleDownloadReportClick = () => {
    trackEventHandler();
    if (isLoggedIn && window !== undefined) {
      window.open(brochureLink, "_blank");
    } else {
      setIsLoginModalOpen(true, `${trackEventSource}_download_report`);
    }
  };
  
  return (
    <Button
      type="primary"
      size={buttonSize}
      className={classnames(styles.downloadReportButton, className)}
      block={block}
      iconPosition="end"
      icon={<img src={ArrowUpRightIcon.src} alt="arrow-up-right" />}
      onClick={handleDownloadReportClick}
    >
      {text}
    </Button>
  );
}