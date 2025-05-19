import { tracker } from "@lib";

import { TrackingProps } from "@modules/ssb/landing_v2/types";

export const pageTrackingSources = {
  Footer: "footer",
  StudentFeatureContainer: "student_feature_container",
}

export const pageTrackingEvents = {
  ContactUs: "contact_us",
  ctaClicked: "cta_clicked",
  videoPlayed: "video_played",
}

export const trackEvent = {
  click: ({clickType = 'click', clickText, clickSource, custom }: TrackingProps) => {
    tracker.click({
      click_type: clickType,
      click_text: clickText,
      click_source: clickSource,
      custom: custom,
    });
  },
  sectionView: ({ sectionName, custom }: { sectionName: string, custom?: object }) => {
    tracker.sectionView({
      section_name: sectionName,
      custom: custom,
    });
  }
}