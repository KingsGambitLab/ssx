import styles from './NewsCardContainer.module.scss';
import NewsCard from '../NewsCard/NewsCard';
import hindudesktop from '@public/images/ssb/hindudesktop.webp';
import brainfeeddesktop from '@public/images/ssb/brainfeeddesktop.webp';
import outlookdesktop from '@public/images/ssb/outlookdesktop.webp';
import timedesktop from '@public/images/ssb/timedesktop.webp';

export default function NewsCardContainer() {
  return (
    <div className={styles.newsCardContainer}>
      <NewsCard 
        imageSrc={hindudesktop}
        boldText="Scaler has launched the Scaler School of Business"
        text=""
      />
      <NewsCard 
        imageSrc={brainfeeddesktop}
        boldText="India's first business school"
        text=" built by industry leaders for future leaders."
      />
      <NewsCard 
        imageSrc={outlookdesktop}
        boldText="Scaler Diversifies Its Offering, "
        text=" by Launching Scaler School of Business"
      />
      <NewsCard 
        imageSrc={timedesktop}
        boldText="TIME World's Top EdTech Companies 2024-"
        text=" Scaler is at the top!"
      />
    </div>
  )
}