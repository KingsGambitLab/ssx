import tracker from '@lib/tracking';

import { TrackingProps } from '@modules/sst/degree/types';

export const pageTrackingSources = {
  sstVsTraditionalCard: "sst_vs_traditional_card",
  keyFeatureCard: "key_feature_card",
  keyFeatures: "key_features",
  applyCtaBanner: "apply_cta_banner",
  Faq: "faq",
  Footer: "footer",
  FloatingNavbar: "floating_navbar",
  DegreeHero: "degree_hero",
  degreePathways: "degree_pathways",
  skillsVsDegree: "skills_vs_degree",
}

export const pageTrackingEvents = {
  modalOpened: "modal_opened",
  modalClosed: "modal_closed",
  explorePlacementButtonClicked: "explore_placement_button_clicked",
  ctaClicked: "cta_clicked",
  applyNowClicked: "apply_now_button_clicked",
  resumeApplicationClicked: "resume_application_button_clicked",
  FaqOpened: "faq_opened",
  FaqClosed: "faq_closed",
  ContactUs: "contact_us",
  ReadAllFaqs: "read_all_faqs",
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