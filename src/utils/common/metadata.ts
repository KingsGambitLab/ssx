import favicon from '@public/favicon/favicon-sst.ico';
import metaImage from '@public/images/sst/png/sst-meta-image.png';

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
    description: 'Scaler School of Business - Undergraduate Program delivered by 100+ leaders from Google, Microsoft, Uber etc.',
    openGraph: {
      siteName: 'scaler',
      title: 'Scaler School of Business',
      description: 'Scaler School of Business - Undergraduate Program delivered by 100+ leaders from Google, Microsoft, Uber etc.',
      url: '/school-of-business/',
      images: [{ url: metaImage.src }],
    },
    icons: { icon: [{ url: favicon.src, rel: 'icon' }] },
  }
};