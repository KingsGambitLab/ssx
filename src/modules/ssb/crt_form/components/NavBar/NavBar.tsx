import styles from './NavBar.module.scss';
import Image from 'next/image';
import ssbLogo from '@public/images/ssb/CRTForm/SSB logo.webp';
import Link from 'next/link';

export default function Navbar() {
    return (
    <div className={styles.navbar}>
        <Image
            src={ssbLogo}
            alt="School of Business Logo"
            width={117}
            height={34}
            className={styles.logoImage}
        />
        <div className={styles.links}>
            <Link href="/school-of-business" className={styles.link}>Home</Link>
            <Link href="/school-of-business/admission" className={styles.link}>Admission</Link>
            <Link href="/school-of-business/about" className={styles.link}>Events</Link>
            <Link href="/school-of-business/contact" className={styles.link}>FAQs</Link>
            <Link href="/school-of-business/faq" className={styles.link}>Career Path</Link>
        </div>
        <div className={styles.buttons}>
            <button>Login</button>
            <button>Register</button>
        </div>
    </div>
    );
  }