import tracker from '@lib/tracking';

import { TrackingProps } from '@modules/sst/info/types';

export const pageTrackingSources = {
  successStories: "success_stories",
  admissionStepTimeline: "admission_step_timeline",
  footer: "footer",
}

export const pageTrackingEvents = {
  modalOpened: "modal_opened",
  modalClosed: "modal_closed",
  ctaClicked: "cta_clicked",
  ContactUs: "contact_us",
  ReadAllFaqs: "read_all_faqs",
  videoPlayed: "video_played",
  videoClosed: "video_closed",
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