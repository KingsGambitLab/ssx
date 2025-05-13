import styles from './StudentFeatureContainer.module.scss';
import Image from 'next/image';
import imgA from '@public/images/ssb/SSB-38.webp';
import imgB from '@public/images/ssb/SSB-18.webp';
import imgC from '@public/images/ssb/SSB-2108 1.webp';
import imgD from '@public/images/ssb/SSB-2223.webp';
import imgE from '@public/images/ssb/SSB-2242.webp';
import imgF from '@public/images/ssb/SSB-2251.webp';
import imgVideo from '@public/images/ssb/P7uEQ9jjqsY-HD 1.webp';

export default function StudentFeatureContainer() {
    return (
        <div className={styles.studentFeatureContainer}>
            <div className={styles.studentFeatureContainerTitle}>

                <div className={styles.studentFeatureContainerTitleText1}>
                    STUDENT FEATURES
                </div>
                <div className={styles.studentFeatureContainerTitleText2}>
                    <div className={styles.studentFeatureContainerTitleText2Text1}>Life Beyond the <span>Classroom</span></div>
                    <div className={styles.studentFeatureContainerTitleText2Text2}>Engage in a lively campus featuring an Innovation Lab, Turf arena, and collaborative co-working spaces</div>
                </div>

            </div>

            <div className={styles.studentFeatureContainerImageGrid}>
                <Image
                    src={imgA}
                    alt="A"
                    className={styles.imgA}
                    style={{ width: '100%', height: '100%' ,objectFit: 'cover'}}
                />
                <Image
                    src={imgB}
                    alt="B"
                    className={styles.imgB}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Image
                    src={imgC}
                    alt="C"
                    className={styles.imgC}
                    style={{ width: '100%', height: '100%' ,objectFit: 'cover' }}
                />
                <Image
                    src={imgD}
                    alt="D"
                    className={styles.imgD}
                    style={{ width: '100%', height: '100%' ,objectFit: 'cover' }}
                />
                <Image
                    src={imgE}
                    alt="E"
                    className={styles.imgE}
                    style={{ width: '100%', height: '100%' ,objectFit: 'cover' }}
                />
                <Image
                    src={imgF}
                    alt="F"
                    className={styles.imgF}
                    style={{ width: '100%', height: '100%' ,objectFit: 'cover' }}
                />
            </div>

            <div className={styles.studentFeatureContainerVideoImage}>
                <Image
                    src={imgVideo}
                    alt="video"
                    className={styles.imgVideo}
                    style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                    <path d="M35.1933 6.70459C29.6055 6.70459 24.1432 8.36156 19.4971 11.466C14.8511 14.5704 11.2299 18.9828 9.09152 24.1453C6.95316 29.3077 6.39367 34.9883 7.48379 40.4688C8.57392 45.9492 11.2647 50.9833 15.2159 54.9345C19.167 58.8856 24.2011 61.5764 29.6816 62.6665C35.162 63.7567 40.8426 63.1972 46.0051 61.0588C51.1675 58.9204 55.5799 55.2993 58.6843 50.6532C61.7888 46.0071 63.4457 40.5448 63.4457 34.957C63.4314 27.4684 60.4502 20.2906 55.1549 14.9954C49.8597 9.70015 42.6819 6.71895 35.1933 6.70459ZM45.0817 36.7771L32.0421 45.4701C31.6824 45.6927 31.2697 45.8147 30.8468 45.8233C30.4884 45.823 30.135 45.7393 29.8145 45.5788C29.4671 45.3913 29.1773 45.1126 28.9763 44.7728C28.7752 44.433 28.6706 44.0448 28.6735 43.65V26.2639C28.6706 25.8691 28.7752 25.481 28.9763 25.1412C29.1773 24.8013 29.4671 24.5227 29.8145 24.3352C30.1634 24.1586 30.5521 24.0758 30.9427 24.0948C31.3332 24.1139 31.7121 24.2341 32.0421 24.4438L45.0817 33.1369C45.3844 33.3344 45.633 33.6042 45.8051 33.9221C45.9772 34.2399 46.0674 34.5956 46.0674 34.957C46.0674 35.3184 45.9772 35.6741 45.8051 35.9919C45.633 36.3097 45.3844 36.5796 45.0817 36.7771Z" fill="white"/>
                </svg>
            </div>

            <div className={styles.studentFeatureContainerFooterText}>
            
                <div className={styles.studentFeatureContainerFooterText1}>Future Leaders in <span>Action</span></div>
                <div className={styles.studentFeatureContainerFoooterText2}>Practical learning meets entrepreneurial spirit at Scaler School of Business</div>
                
            </div>
        </div>
    )
}   