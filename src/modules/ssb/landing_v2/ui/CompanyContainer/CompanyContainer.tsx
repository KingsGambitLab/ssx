'use client';

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
                <Image src={bain_capital_logo} alt="bain_capital" className={styles.companyContainerImageLogo}/>
                <Image src={amazon_logo} alt="amazon" className={styles.companyContainerImageLogo}/>
                <Image src={swiggy_logo} alt="swiggy" className={styles.companyContainerImageLogo}/>
                <Image src={jp_morgan_logo} alt="jp_morgan" className={styles.companyContainerImageLogo}/>
                <Image src={google_logo} alt="google" className={styles.companyContainerImageLogo}/>
                <Image src={deloitte_logo} alt="deloitte" className={styles.companyContainerImageLogo}/>
                <Image src={pwc_logo} alt="pwc" className={styles.companyContainerImageLogo}/>
                <Image src={accenture_logo} alt="accenture" className={styles.companyContainerImageLogo}/>
                <Image src={razorpay_logo} alt="razorpay" className={styles.companyContainerImageLogo}/>
                <Image src={zomato_logo} alt="zomato" className={styles.companyContainerImageLogo}/>
                <Image src={delhivery_logo} alt="delhivery" className={styles.companyContainerImageLogo}/>
                <Image src={flipkart_logo} alt="flipkart" className={styles.companyContainerImageLogo}/>
                <Image src={morgan_stanley_logo} alt="morgan_stanley" className={styles.companyContainerImageLogo}/>
                <Image src={paypal_logo} alt="paypal" className={styles.companyContainerImageLogo}/>
                <Image src={ola_logo} alt="ola" className={styles.companyContainerImageLogo}/>
                <Image src={dream11_logo} alt="dream11" className={styles.companyContainerImageLogo}/>
                <Image src={microsoft_logo} alt="microsoft" className={styles.companyContainerImageLogo}/>
                <Image src={walmart_logo} alt="walmart" className={styles.companyContainerImageLogo}/>
                <Image src={uber_logo} alt="uber" className={styles.companyContainerImageLogo}/>
                <Image src={myntra_logo} alt="myntra" className={styles.companyContainerImageLogo}/>
            </div>
            <div className={styles.displayCardContainer}>   
                <FancyDisplayCard headText="5000+" sectionText="Learners Placed" />
                <FancyDisplayCard headText="25 LPA" sectionText="Median Salary" />
            </div>
            <div className={styles.highlightTextContainer}>
                With an already <span className={styles.highlightTextContainerSpan1}>proven track record </span> of outcomes through our <span className={styles.highlightTextContainerSpan1}>online</span> programs
            </div>
        </div>
    )
}