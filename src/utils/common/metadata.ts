import favicon from '@public/favicon/favicon-sst.ico';
import faviconSsb from '@public/favicon/favicon-ssb.ico';
import metaImage from '@public/images/sst/png/sst-meta-image.png';
import metaImageSsb from '@public/images/ssb/ssb-meta-image.webp';

const SCALER_HOME_URL = 'https://www.scaler.com';

export const METADATA = {
  SST: {
    metadataBase: new URL(SCALER_HOME_URL),
    title: 'Scaler School of Technology',
    description: 'Scaler School of Technology - Undergraduate Program delivered by 100+ leaders from Google, Microsoft, Uber etc.',
    openGraph: {
      siteName: 'scaler',
      title: 'Scaler School of Technology',
      description: 'Scaler School of Technology - Undergraduate Program delivered by 100+ leaders from Google, Microsoft, Uber etc.',
      url: '/school-of-technology/',
      images: [{ url: metaImage.src }],
    },
    icons: { icon: [{ url: favicon.src, rel: 'icon' }] },
  },
  SSB: {
    metadataBase: new URL(SCALER_HOME_URL),
    title: 'Scaler School of Business',
    description: 'India’s Only B-School Built by Industry Leaders, for Industry Leaders',
    openGraph: {
      siteName: 'scaler',
      title: 'Scaler School of Business',
      description: 'India’s Only B-School Built by Industry Leaders, for Industry Leaders',
      url: '/school-of-business/',
      images: [{ url: metaImageSsb.src }],
    },
    icons: { icon: [{ url: faviconSsb.src, rel: 'icon' }] },
  }
};