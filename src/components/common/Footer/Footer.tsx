import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

// Social Icons
import YouTubeIcon from '@public/images/sst/svg//twitterlogo.svg';
import InstagramIcon from '@public/images/sst/svg//twitterlogo.svg';
import LinkedInIcon from '@public/images/sst/svg//linkedin-icon.svg';
import TwitterIcon from '@public/images/sst/svg//twitterlogo.svg';
import FacebookIcon from '@public/images/sst/svg//twitterlogo.svg';
import QuoraIcon from '@public/images/sst/svg//twitterlogo.svg';
import GooglePlayIcon from '@public/images/sst/svg/downloadongoogleplay.svg';
import SSTLogoLight from '@public/images/sst/svg/sst-logo-light.svg';

// Constants
import { FOOTER_SECTIONS, SOCIAL_LINKS } from './constants';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__branding}>
          <div className={styles.footer__logo}>
            <Image 
              src={SSTLogoLight} 
              alt="Scaler School of Technology" 
              width={300} 
              height={150} 
            />
            <div>#CreateImpact</div>
          </div>
          
          <div className={styles.playstore}>
            <Link href="https://play.google.com/store/apps/details?id=com.scaler.app&utm_source=scaler-footer-menu&utm_campaign=scaler-app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" className={styles.playstore__link}>
              <Image 
                src={GooglePlayIcon} 
                alt="Get it on Google Play" 
                width={216} 
                height={72}
                className={styles.playstore__image}
              />
            </Link>
          </div>
        </div>

        <div className={styles.footer__coloumn}>
          {/* Our Offerings */}
          <div className={styles['footer-items']}>
            <h3 className={styles['footer-items__heading']}>{FOOTER_SECTIONS[0].title}</h3>
            <div className={styles['footer-items__content']}>
              {FOOTER_SECTIONS[0].links.map((link) => (
                <Link key={link.text} href={link.href} className={styles['footer-items__link']}>
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className={styles['footer-items']}>
            <h3 className={styles['footer-items__heading']}>{FOOTER_SECTIONS[1].title}</h3>
            <div className={styles['footer-items__content']}>
              {FOOTER_SECTIONS[1].links.map((link) => (
                <Link key={link.text} href={link.href} className={styles['footer-items__link']}>
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Teach at Scaler */}
          <div className={styles['footer-items']}>
            <h3 className={styles['footer-items__heading']}>{FOOTER_SECTIONS[2].title}</h3>
            <div className={styles['footer-items__content']}>
              {FOOTER_SECTIONS[2].links.map((link) => (
                <Link key={link.text} href={link.href} className={styles['footer-items__link']}>
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className={styles['footer-items']}>
            <h3 className={styles['footer-items__heading']}>{FOOTER_SECTIONS[3].title}</h3>
            <div className={styles['footer-items__content']}>
              {FOOTER_SECTIONS[3].links.map((link) => (
                <Link key={link.text} href={link.href} className={styles['footer-items__link']}>
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Follow us on */}
          <div className={styles.footer__social}>
            <h3 className={styles['footer-items__heading']}>Follow us on</h3>
            <div className={styles['footer-items__social']}>
              {/* First 4 icons visible on all views */}
              <Link href="#" aria-label="Twitter" className={styles['footer-items__link']}>
                <Image src={TwitterIcon} alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="#" aria-label="YouTube" className={styles['footer-items__link']}>
                <Image src={YouTubeIcon} alt="YouTube" width={24} height={24} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className={styles['footer-items__link']}>
                <Image src={LinkedInIcon} alt="LinkedIn" width={24} height={24} />
              </Link>
              <Link href="#" aria-label="Instagram" className={styles['footer-items__link']}>
                <Image src={InstagramIcon} alt="Instagram" width={24} height={24} />
              </Link>
              
              {/* Last 2 icons only visible on mobile */}
              <Link href="#" aria-label="Facebook" className={styles['footer-items__link']}>
                <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="#" aria-label="Quora" className={styles['footer-items__link']}>
                <Image src={QuoraIcon} alt="Quora" width={24} height={24} />
              </Link>
            </div>
          </div>

          {/* Other */}
          <div className={styles['footer-items']}>
            <h3 className={styles['footer-items__heading']}>{FOOTER_SECTIONS[4].title}</h3>
            <div className={styles['footer-items__content']}>
              {FOOTER_SECTIONS[4].links.map((link) => (
                <Link key={link.text} href={link.href} className={styles['footer-items__link']}>
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className={styles.footer__copyright}>
        © 2024 InterviewBit Technologies Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
