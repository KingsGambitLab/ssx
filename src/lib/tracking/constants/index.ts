export const GTM_ID = process.env.NEXT_PUBLIC_GTM;

export const MICROSOFT_CLARITY_ID = (process.env.NODE_ENV === "production") ? 'nc8eckmcvm' : '';

export const EVENT_NAMES = {
  PAGE_VIEW: 'we_page_load',
  CLICK: 'gtm_custom_click',
  HOVER: 'gtm_custom_hover',
  VIEW: 'gtm_custom_view',
  LOGOUT: 'logout',
};
