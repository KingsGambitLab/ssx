
import styles from './BusinessLeaderContainer.module.scss';
import BusinessLeaderCard from '../BusinessLeaderCard/BusinessLeaderCard';
import BinnyBansal from '../../../../../../public/images/ssb/Binny.webp';
import flipkart_logo from '../../../../../../public/images/ssb/flipkart_without_logo.webp';
import DeepinderGoyal from '../../../../../../public/images/ssb/Deepinder.webp';
import zomato_logo from '../../../../../../public/images/ssb/zomato.webp';
import KunalShah from '../../../../../../public/images/ssb/Kunal.webp';
import cred_logo from '../../../../../../public/images/ssb/cred.webp';
import Bhavik from '../../../../../../public/images/ssb/Bhavik.webp';
import uber_logo from '../../../../../../public/images/ssb/uber_white.webp';
import Rajan from '../../../../../../public/images/ssb/Rajan.webp';
import peak_logo from '../../../../../../public/images/ssb/peak.webp';
import Sucheta from '../../../../../../public/images/ssb/Sucheta.webp';
import airtel_logo from '../../../../../../public/images/ssb/airtel.webp';


export default function BusinessLeaderContainer() {
    return (
        <div className={styles.businessLeaderContainer}>
            <div className={styles.businessLeaderContainerTitle}>
                <div className={styles.businessLeaderContainerTitleText1}>
                    Backed by India’s 
                </div>
                <div className={styles.businessLeaderContainerTitleText2}>
                    Top Business Leaders
                </div>
            </div>
            <div className={styles.businessLeaderCardContainer}>
                <BusinessLeaderCard name="Binny Bansal" image={BinnyBansal.src} company_logo={flipkart_logo.src} />
                <BusinessLeaderCard name="Deepinder Goyal" image={DeepinderGoyal.src} company_logo={zomato_logo.src} />
                <BusinessLeaderCard name="Kunal Shah" image={KunalShah.src} company_logo={cred_logo.src} />
                <BusinessLeaderCard name="Bhavik Rathod" image={Bhavik.src} company_logo={uber_logo.src} />
                <BusinessLeaderCard name="Rajan Anandan" image={Rajan.src} company_logo={peak_logo.src} />
                <BusinessLeaderCard name="Sucheta Dalal" image={Sucheta.src} company_logo={airtel_logo.src} />
            </div>
        </div>
    )
}