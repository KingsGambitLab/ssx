'use client';

import Script from "next/script";

import { MICROSOFT_CLARITY_ID } from "@lib/tracking/constants";

const MicrosoftClarity = () => {
  if (MICROSOFT_CLARITY_ID) {
    return (
      <Script
        id="microsoft-clarity-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", '${MICROSOFT_CLARITY_ID}');
            `,
        }}
      />
    );
  } else {
    return null;
  }
}

export default MicrosoftClarity;
