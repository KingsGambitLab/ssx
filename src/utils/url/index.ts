import { setCookie, getCookie } from "cookies-next";

import { BYPASS_UTM, UTM_MEDIUM, UTM_SOURCE } from "./constants";
import { CSRFTOKEN } from '@/api/endPoints/user';


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

export const csrfTokenMemo = () => {
  let token: string | null | undefined = null;

  return async function () {
    if (token) return Promise.resolve(token);

    const response = await fetch(CSRFTOKEN, { method: 'GET' });
    const result = await response.json();
    token = result?.["csrf_token"];

    return token;
  }
}

export const fetchCsrfToken = csrfTokenMemo();
