import { setCookie, getCookie } from "cookies-next";

import { BYPASS_UTM, UTM_MEDIUM, UTM_SOURCE } from "./constants";


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
