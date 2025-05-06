import tracker from '@lib/tracking';

import { TrackingProps } from '@modules/sst/career-outcomes/types';

export const pageTrackingSources = {
  placementTab: "placement_tab",
  Entrepreneurship: "Entrepreneurship",
  successStories: "success_stories",
  educationTeam: "education_team",
  entrepreneurshipTeam: "entrepreneurship_team",
  guestSpeakers: "guest_speakers",
  startups: "startups",
  higherStudiesCard: "higher_studies_card",
  innovationLabProjects: "innovation_lab_projects",
  studentTestimonials: "student_testimonials",
  sstVsTraditional: "sst_vs_traditional",
  heroSection: "hero_section",
  provenTrackRecord: "proven_track_record",
  careerStats: "career_stats",
  mentorship: "mentorship",
}

export const pageTrackingEvents = {
  modalOpened: "modal_opened",
  modalClosed: "modal_closed",
  ctaClicked: "cta_clicked",
  applyNowClicked: "apply_now_button_clicked",
  resumeApplicationClicked: "resume_application_button_clicked",
  FaqOpened: "faq_opened",
  FaqClosed: "faq_closed",
  ContactUs: "contact_us",
  ReadAllFaqs: "read_all_faqs",
  videoPlayed: "video_played",
  videoClosed: "video_closed",
  downloadBrochure: "download_brochure",
  downloadReport: "download_report",
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