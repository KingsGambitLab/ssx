import { GTM_ID } from "@lib/tracking/constants";

export default function lazyLoadGtm() {
  if (GTM_ID) {
    let isGTMLoaded = false;
    const loadGTM = () => {
      if (!isGTMLoaded) {
        isGTMLoaded = true;

        // @ts-ignore
        (function (w, d, s, l, i) {
          w[l] = w[l] || []; w[l].push({
            'gtm.start':
              new Date().getTime(), event: 'gtm.js'
          }); var f = d.getElementsByTagName(s)[0],
            // @ts-expect-error
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.defer = true; j.src =
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          j.addEventListener('load', function () {
            var _ge = new CustomEvent('initializedGTM', { bubbles: true });
            d.dispatchEvent(_ge);
          });
          f.parentNode?.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', GTM_ID);

        // @ts-expect-error
        (function (a, s, y, n, c, h, i, d, e) {
          s.className += ' ' + y; h.start = 1 * new Date;
          // @ts-expect-error
          h.end = i = function () { s.className = s.className.replace(RegExp(' ?' + y), '') };
          // @ts-expect-error
          (a[n] = a[n] || []).hide = h; setTimeout(function () { i(); h.end = null }, c); h.timeout = c;
        })(window, document.documentElement, 'async-hide', 'dataLayer', 4000,
          // @ts-expect-error
          { [GTM_ID]: true });

        window.removeEventListener('mousemove', loadGTM);
        window.removeEventListener('click', loadGTM);
        window.removeEventListener('scroll', loadGTM);
        window.removeEventListener('touchstart', loadGTM);
        window.removeEventListener('bypass_gtm_optimisation', loadGTM);
      }
    };
    window.addEventListener('mousemove', loadGTM);
    window.addEventListener('click', loadGTM);
    window.addEventListener('scroll', loadGTM);
    window.addEventListener('touchstart', loadGTM);
    window.addEventListener('bypass_gtm_optimisation', loadGTM);
  }
}
