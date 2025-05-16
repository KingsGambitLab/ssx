import tracker from '@lib/tracking';

import { TrackingProps } from '@modules/ssb/landing_v2/types';

export const pageTrackingSources = {
  landingPage: "landing_page",
  waitlistModal: "waitlist_modal",
  registrationForm: "registration_form",
  personalInformationForm: "personal_information_form", 
}

export const pageTrackingEvents = {
  click: "click",
  sectionView: "section_view",
}

export const trackEvent = {
  click: ({ clickType, clickText, clickSource, custom }: TrackingProps) => {
    tracker.click({ 
      click_type: clickType, 
      click_text: clickText, 
      click_source: clickSource, 
      custom: custom 
    });
  },
  sectionView: ({ sectionName, custom }: { sectionName: string, custom?: object }) => {
    tracker.sectionView({ 
      section_name: sectionName, 
      custom: custom 
    });
  }
};
