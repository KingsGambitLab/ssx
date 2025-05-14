import styles from './CompanyContainer.module.scss';
import Image from 'next/image';

import FancyDisplayCard from '../../components/FancyDisplayCard/FancyDisplayCard';

import bain_capital_logo from '@public/images/ssb/baincapital.webp';
import amazon_logo from '@public/images/ssb/amazon.webp';
import swiggy_logo from '@public/images/ssb/swiggy.webp';
import jp_morgan_logo from '@public/images/ssb/jp_morgan.webp';
import google_logo from '@public/images/ssb/google.webp';
import deloitte_logo from '@public/images/ssb/deloitte.webp';
import pwc_logo from '@public/images/ssb/pwc.webp';
import accenture_logo from '@public/images/ssb/accenture.webp';
import razorpay_logo from '@public/images/ssb/razorpay.webp';
import zomato_logo from '@public/images/ssb/zomato_red.webp';
import delhivery_logo from '@public/images/ssb/delhivery.webp';
import flipkart_logo from '@public/images/ssb/flipkart_with_logo.webp';
import morgan_stanley_logo from '@public/images/ssb/morgan_stanley.webp';
import paypal_logo from '@public/images/ssb/paypal.webp';
import ola_logo from '@public/images/ssb/ola.webp';
import dream11_logo from '@public/images/ssb/dream_11.webp';
import microsoft_logo from '@public/images/ssb/microsoft.webp';
import walmart_logo from '@public/images/ssb/walmart.webp';
import uber_logo from '@public/images/ssb/uber.webp';
import myntra_logo from '@public/images/ssb/myntra.webp';


export default function CompanyContainer() {
    return (
        <div className={styles.companyContainer}>
            <div className={styles.companyContainerTitle}>
                Get placed at Top MNCs and Startups with our  
                <span className={styles.companyContainerTitle2}> 1200+ hiring partners</span>
            </div>
            <div className={styles.companyContainerImage}>
                <Image src={bain_capital_logo.src} alt="bain_capital" width={120} height={60} />
                <Image src={amazon_logo.src} alt="amazon" width={120} height={60} />
                <Image src={swiggy_logo.src} alt="swiggy" width={120} height={60} />
                <Image src={jp_morgan_logo.src} alt="jp_morgan" width={120} height={60} />
                <Image src={google_logo.src} alt="google" width={120} height={60} />
                <Image src={deloitte_logo.src} alt="deloitte" width={120} height={60} />
                <Image src={pwc_logo.src} alt="pwc" width={120} height={60} />
                <Image src={accenture_logo.src} alt="accenture" width={120} height={60} />
                <Image src={razorpay_logo.src} alt="razorpay" width={120} height={60} />
                <Image src={zomato_logo.src} alt="zomato" width={120} height={60} />
                <Image src={delhivery_logo.src} alt="delhivery" width={120} height={60} />
                <Image src={flipkart_logo.src} alt="flipkart" width={120} height={60} />
                <Image src={morgan_stanley_logo.src} alt="morgan_stanley" width={120} height={60} />
                <Image src={paypal_logo.src} alt="paypal" width={120} height={60} />
                <Image src={ola_logo.src} alt="ola" width={120} height={60} />
                <Image src={dream11_logo.src} alt="dream11" width={120} height={60} />
                <Image src={microsoft_logo.src} alt="microsoft" width={135} height={60} />
                <Image src={walmart_logo.src} alt="walmart" width={120} height={60} />
                <Image src={uber_logo.src} alt="uber" width={120} height={50} />
                <Image src={myntra_logo.src} alt="myntra" width={120} height={60} />

            </div>
            <div className={styles.displayCardContainer}>   
                <FancyDisplayCard headText="5000+" sectionText="Learners Placed" />
                <FancyDisplayCard headText="25 LPA" sectionText="Median Salary" />
            </div>
            <div className={styles.highlightTextContainer}>
                With an already <span className={styles.highlightTextContainerSpan1}>proven track </span> <span className={styles.highlightTextContainerSpan2}> record </span> of outcomes through our online programs
            </div>
        </div>
    )
}