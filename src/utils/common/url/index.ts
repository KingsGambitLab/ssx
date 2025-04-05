import { setCookie, getCookie } from "cookies-next";

import {
  BYPASS_UTM,
  GOOGLE_URL,
  ORGANIC_SEARCH,
  ORGANIC_SITE_LIST,
  ORGANIC_SOCIAL,
  ORGANIC_VIDEO,
  REFERRAL,
  SEARCH_SITE_LIST,
  UTM_MEDIUM,
  UTM_MEDIUM_DEFAULT,
  UTM_SOURCE,
  UTM_SOURCE_DEFAULT,
  VIDEO_SITE_LIST,
} from './constants';
import axios from "axios";


const isProduction = process.env.NODE_ENV === 'production';

export const API_BASE_URL = isProduction
  ? `${process.env.NEXT_PUBLIC_BASE_URL}`
  : `${process.env.NEXT_PUBLIC_BASE_URL}/api/base_api`;

export const csrfTokenMemo = () => {
  let token: string | null | undefined = null;

  return async function () {
    if (token) return Promise.resolve(token);

    const response = await axios(`${API_BASE_URL}/csrf-token`, { method: 'GET' });
    token = response?.data?.["csrf_token"];

    return token;
  }
}

export const fetchCsrfToken = csrfTokenMemo();

function findDomian(arr: Array<string>, url: string) {
  try {
    const hostnameArr = new URL(url).hostname.split('.');
    for (let i = 0; i < arr.length; i += 1) {
      const arrEle = arr[i];
      if (hostnameArr.includes(arrEle)) {
        return true;
      }
    }
  } catch (e) {
    console.error('error', e);
  }
  return false;
}

function sameOrigin(url: string) {
  const { host } = window.location;
  return url.includes(host);
}

export function initializeUtmPropagation() {
  const cookieMinutes = 30;
  const params = new URLSearchParams(window.location.search);
  const utmParams: Array<string> = [];
  params.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      if (key === 'utm_source') {
        utmParams.push(
          `${key}=${value.includes('google.com') ? GOOGLE_URL : value
          }`,
        );
      } else {
        utmParams.push(`${key}=${value}`);
      }
    }
  });
  let utmQuery = decodeURIComponent(utmParams.join('&'));

  if (!utmQuery) {
    utmQuery = getCookie(BYPASS_UTM) as string;
    if (!utmQuery) {
      // if utm params is not present in the URL
      // and cookie check for Header Referer
      if (
        document.referrer
        && !sameOrigin(document.referrer)
      ) {
        let utmMedium = REFERRAL;
        if (
          findDomian(SEARCH_SITE_LIST, document.referrer)
        ) {
          utmMedium = ORGANIC_SEARCH;
        } else if (
          findDomian(ORGANIC_SITE_LIST, document.referrer)
        ) {
          utmMedium = ORGANIC_SOCIAL;
        } else if (
          findDomian(VIDEO_SITE_LIST, document.referrer)
        ) {
          utmMedium = ORGANIC_VIDEO;
        }
        utmParams.push(`utm_medium=${utmMedium}`);
        utmParams.push(`utm_source=${document.referrer.includes('google.com')
          ? GOOGLE_URL : document.referrer
          }`);
      } else {
        // UTMs are NOT present in the URL, not in the cookie
        // Source is Scaler/ib or No Header Referer
        utmParams.push(`utm_medium=${UTM_MEDIUM_DEFAULT}`);
        utmParams.push(`utm_source=${UTM_SOURCE_DEFAULT}`);
      }
      utmQuery = utmParams.join('&');
    }
  }

  if (utmQuery) {
    // scaler/ib current url as utm_content
    if (!utmQuery.includes('utm_content')) {
      utmQuery += `&utm_content=${window.location.pathname}`;
    }
    utmQuery = decodeURIComponent(utmQuery);
    const d = new Date();

    d.setTime(d.getTime() + (cookieMinutes * 60 * 1000));
    setCookie(BYPASS_UTM, utmQuery, { expires: d });
  }
}

export function getURLWithUTMParams(url: string) {
  let pageUrl = url;
  const utmQuery = getCookie(BYPASS_UTM);
  if (
    !pageUrl.includes(UTM_MEDIUM)
    && !pageUrl.includes(UTM_SOURCE)
    && utmQuery
  ) {
    const nonUtmQuery = window.location.search;
    pageUrl += nonUtmQuery ? `&${utmQuery}` : `?${utmQuery}`;
  }

  return pageUrl;
}

export function getUTMPropagationParams() {
  const utmQuery = getCookie(BYPASS_UTM);
  const utmParams: Record<string, string> = {};
  if (utmQuery) {
    const params = (utmQuery as string).split('&');
    if (params) {
      params.forEach((param: string) => {
        const [key, value] = param.split('=');
        utmParams[key] = value;
      });
    }
  }

  return utmParams;
}
