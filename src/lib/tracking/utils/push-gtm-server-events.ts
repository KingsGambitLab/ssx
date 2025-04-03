import { deleteCookie, getCookie } from "cookies-next";
import tracker from '@lib/tracking';

const COOKIE_KEY = 'gtm_data';

export default function pushServerEvents() {
  if (typeof window === "undefined") return;

  const cookieData = getCookie(COOKIE_KEY) as string;
  if (!cookieData) return;

  const decodedCookieData = decodeURIComponent(cookieData.replace(/\+/g, "%20"));
  const events = JSON.parse(decodedCookieData);
  if (!Array.isArray(events)) return;

  events.forEach((event: string) => {
    tracker.pushRawEvent(JSON.parse(event));
  });
  deleteCookie(COOKIE_KEY);
}
