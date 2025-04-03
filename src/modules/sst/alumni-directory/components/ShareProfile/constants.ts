import Facebook from '@public/images/sst/svg/facebook-icon.svg';
import LinkedIn from '@public/images/sst/svg/linkedin-icon.svg';
import Twitter from '@public/images/sst/svg/twitter-icon.svg';
import Link from '@public/images/sst/svg/copy-link.svg';

export const SHARE_PLATFORMS = {
  facebook: {
    order: 1,
    icon: Facebook,
    text: 'facebook',
    url: ({ text, url }: { text: string; url: string }) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
  },
  linkedin: {
    order: 2,
    icon: LinkedIn,
    text: 'linkedin',
    url: ({ text, url }: { text: string; url: string }) =>
      `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  twitter: {
    order: 3,
    icon: Twitter,
    text: 'twitter',
    tooltip: 'Share on Twitter',
    url: ({ text, url }: { text: string; url: string }) =>
      `https://twitter.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  sharable: {
    order: 4,
    icon: Link,
    text: 'sharable',
    tooltip: 'Copy Link',
    url: ({ text, url }: { text: string; url: string }) => {
      navigator.clipboard.writeText(`${text}\n${url}`);
      return false;
    },
  },
};

export const SHARE_PROFILE_URL = 'https://www.scaler.com/school-of-technology/alumni-directory';