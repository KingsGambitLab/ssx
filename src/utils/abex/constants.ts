//add A/B Experiments here
export const ABEX_FLAG_CONFIG = {
  BOTTOM_NAVBAR: {
    KEY: 'sst_bottom_navbar',
    DEFAULT_VARIANT: 'sst_bottom_navbar_v1',
  },
};


// ABEX API CALLS

const {
  ABEX_BASIC_AUTH_USERNAME,
  ABEX_BASIC_AUTH_PASSWORD,
  ABEX_BASE_URL,
} = process.env;

const isProduction = process.env.NODE_ENV === 'production';

const ABEX_AUTH_TOKEN = `Basic ${btoa(`${ABEX_BASIC_AUTH_USERNAME}:${ABEX_BASIC_AUTH_PASSWORD}`)}`;

export const ABEX_API_URL = `https://${ABEX_BASE_URL}`;

export const ABEX_REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  ...(isProduction && { Authorization: ABEX_AUTH_TOKEN }),
};
