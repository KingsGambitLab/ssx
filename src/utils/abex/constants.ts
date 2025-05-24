//add A/B Experiments here
export const ABEX_FLAG_CONFIG = {
  SST_LP_REVAMP: {
    KEY: 'sst-homepage-revamp',
    DEFAULT_VARIANT: 'hide_new_page',
    NEW_VARIANT: 'show_new_page',
  },
  SST_INFO_PAGE: {
    KEY: 'sst-info-page',
    DEFAULT_VARIANT: 'show_variant_v1',
    NEW_VARIANT: 'show_variant_v2',
  }
};


// ABEX API CALLS
const isProduction = true;

const ABEX_AUTH_TOKEN = `Basic ${btoa(`${process.env.ABEX_BASIC_AUTH_USERNAME}:${process.env.ABEX_BASIC_AUTH_PASSWORD}`)}`;

export const ABEX_API_URL = `https://${process.env.ABEX_BASE_URL}`;

export const ABEX_REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  ...(isProduction && { Authorization: ABEX_AUTH_TOKEN }),
};
