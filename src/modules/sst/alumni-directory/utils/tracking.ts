import tracker from '@lib/tracking';

import { TrackingProps } from '@modules/sst/alumni-directory/types';

export const pageTrackingSources = {
  searchBar: "search_bar",
  quickFilters: "quick_filters",
  alumniCard: "alumni_card",
  alumniDetailsModal: "alumni_details_modal",
  alumniDirectory: "alumni_directory",
  advancedFilter: "advanced_filter",
  navbar: "navbar",
  userMenuSection: "user_menu_section",
  announcementStrip: "announcement_strip",
}

export const pageTrackingEvents = {
  filterApplied: "filter_applied",
  filterRemoved: "filter_removed",
  searchFilter: "search_filter",
  linkedinButton: "linkedin_button",
  viewProfileButton: "view_profile_button",
  shareButton: "share_button",
  alumniDetailsModalOpened: "alumni_details_modal_opened",
  alumniDetailsModalClosed: "alumni_details_modal_closed",
  projectLinkButton: "project_link_button",
  noAlumniFound: "no_alumni_found",
  openAdvancedFilters: "open_advanced_filters",
  closeAdvancedFilters: "close_advanced_filters",
  clearAllFilters: "clear_all_filters",
  applyAdvancedFilters: "apply_advanced_filters",
  shareProfile: "share_profile",
  navButtonClicked: "nav_button_clicked",
  loginButtonClicked: "login_button",
  applyButtonClicked: "apply_button",
  userMenuClicked: "user_menu_clicked",
  navbarLogoClicked: "navbar_logo_clicked",
  userMenuOpened: "user_menu_opened",
  userMenuClosed: "user_menu_closed",
  announcementStripClicked: "announcement_strip_clicked",
}

export const trackEvent = {
  click: ({ clickType, clickText, clickSource, custom }: TrackingProps) => {
    tracker.click({
      click_type: clickType,
      click_text: clickText,
      click_source: clickSource,
      custom: custom,
    });
  },
  view: ({ clickType, clickText, clickSource, custom }: TrackingProps) => {
    tracker.view({
      click_type: clickType,
      click_text: clickText,
      click_source: clickSource,
      custom: custom,
    });
  }
}