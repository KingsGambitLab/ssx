//add A/B Experiments here
export const ABEX_FLAG_CONFIG = {
  BOTTOM_NAVBAR: {
    KEY: 'sst_bottom_navbar',
    DEFAULT_VARIANT: 'hide_sst_bottom_navbar',
  },
};


// ABEX API CALLS
const isProduction = process.env.NODE_ENV === 'production';

const ABEX_AUTH_TOKEN = `Basic ${btoa(`${process.env.ABEX_BASIC_AUTH_USERNAME}:${process.env.ABEX_BASIC_AUTH_PASSWORD}`)}`;

export const ABEX_API_URL = `https://${process.env.ABEX_BASE_URL}`;

export const ABEX_REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  ...(isProduction && { Authorization: ABEX_AUTH_TOKEN }),
};
