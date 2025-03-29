import Image from 'next/image';

import styles from './ShareProfile.module.scss';

import { SHARE_PLATFORMS, SHARE_PROFILE_URL } from './constants';

type ShareProfileProps = {
  name: string;
  batchYear: string;
  state: string;
}

type SharePlatform = 'twitter' | 'sharable' | 'facebook' | 'linkedin';

export default function ShareProfile({ name, batchYear, state }: ShareProfileProps) {
  const handleShare = (platform: SharePlatform) => {

    const message = `Hey, ${name} is a senior (${batchYear} year) at SST from ${state}. ` +
      `Really friendly and easy to talk to — ping them if you've got any doubts! ` +
      `Here's their profile:`;

    const url = SHARE_PLATFORMS[platform]?.url({
      text: message,
      url: SHARE_PROFILE_URL
    })

    console.log(url);
    if (typeof url === 'string' && window.open) {
      window.open(url, '_blank');
    }
  }
  return (
    <div className={styles.outerContainer}>
      <div className={styles.title}>Share</div>
      <div className={styles.platformContainer}>
        {Object.values(SHARE_PLATFORMS).map((platform) => (
          <div
            key={platform.order}
            className={styles?.platform}
            onClick={() => handleShare(platform.text as SharePlatform)}
            role="button"
            tabIndex={0}
          >
            <Image src={platform.icon} alt={platform.text} height={34} width={34} />
          </div>
        ))}
      </div>
    </div>
  )
}