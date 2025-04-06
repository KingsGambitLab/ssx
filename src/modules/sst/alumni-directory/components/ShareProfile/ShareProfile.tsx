'use client';

import { toast } from 'react-toastify';
import Image from 'next/image';

import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent
} from '@modules/sst/alumni-directory/utils';
import { SHARE_PLATFORMS, SHARE_PROFILE_URL } from './constants';

import styles from './ShareProfile.module.scss';

type ShareProfileProps = {
  id: string;
  name: string;
  batchYear: number;
  state: string;
};

type SharePlatform = 'twitter' | 'sharable' | 'facebook' | 'linkedin';

export default function ShareProfile({ id, name, batchYear, state }: ShareProfileProps) {

  const constructMessage = (name: string, batchYear: number, state: string) => (
    `Hey, ${name} is a senior (${batchYear} year) at SST from ${state}. ` +
    `Really friendly and easy to talk to — ping them if you've got any doubts! ` +
    `Here's their profile:`
  );

  const trackEventHandler = (platform: SharePlatform) => {
    trackEvent.click({
      clickType: pageTrackingEvents.shareProfile,
      clickText: `${platform}`,
      clickSource: pageTrackingSources.alumniDetailsModal,
      custom: {
        alumni_name: name,
        alumni_id: id,
        platform
      },
    });
  }
  const handleShare = (platform: SharePlatform) => {
    trackEventHandler(platform);
    const messageText = constructMessage(name, batchYear, state);

    if (platform === 'sharable') {
      navigator.clipboard.writeText(`${messageText}\n${SHARE_PROFILE_URL}`).then(() => {
        toast.success('Text Copied Successfully!');
      });
    } else {
      const url = SHARE_PLATFORMS[platform]?.url({
        text: messageText,
        url: SHARE_PROFILE_URL,
      });

      if (typeof url === 'string' && window.open) {
        window.open(url, '_blank');
      }
    }
  };

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.title}>Share</div>
        <div className={styles.platformContainer}>
          {Object.values(SHARE_PLATFORMS).map((platform) => (
            <div
              key={platform.order}
              className={styles.platform}
              onClick={() => handleShare(platform.text as SharePlatform)}
              role="button"
              tabIndex={0}
            >
              <Image src={platform.icon} alt={platform.text} height={34} width={34} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
