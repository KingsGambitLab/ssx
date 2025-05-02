import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

// Social Icons
import YouTubeIcon from '@public/images/sst/svg//twitterlogo.svg';
import InstagramIcon from '@public/images/sst/svg//twitterlogo.svg';
import LinkedInIcon from '@public/images/sst/svg//linkedin-icon.svg';
import TwitterIcon from '@public/images/sst/svg//twitterlogo.svg';
import GooglePlayIcon from '@public/images/sst/svg/downloadongoogleplay.svg';
import SSTLogoLight from '@public/images/sst/svg/sst-logo-light.svg';

// Constants
import { FOOTER_SECTIONS, SOCIAL_LINKS } from './constants';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left column with logo and app download */}
          <div className={styles.leftColumn}>
            <div className={styles.logoSection}>
              <Image 
                src={SSTLogoLight} 
                alt="Scaler School of Technology" 
                width={300} 
                height={150} 
                className={styles.logo}
              />
              <div className={styles.slogan}>#CreateImpact</div>
            </div>
            
            <div className={styles.downloadSection}>
              <div className={styles.downloadContent}>
                <Link href="#" className={styles.playStoreButton}>
                  <Image 
                    src={GooglePlayIcon} 
                    alt="Get it on Google Play" 
                    width={216} 
                    height={72}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          <div className={styles.navColumns}>
            <div className={styles.navGroup}>
              {FOOTER_SECTIONS.slice(0, 2).map((section) => (
                <div key={section.title} className={styles.navColumn}>
                  <h3 className={styles.columnTitle}>{section.title}</h3>
                  <div className={styles.columnLinks}>
                    {section.links.map((link) => (
                      <Link key={link.text} href={link.href} className={styles.link}>
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.navGroup}>
              {FOOTER_SECTIONS.slice(2, 4).map((section) => (
                <div key={section.title} className={styles.navColumn}>
                  <h3 className={styles.columnTitle}>{section.title}</h3>
                  <div className={styles.columnLinks}>
                    {section.links.map((link) => (
                      <Link key={link.text} href={link.href} className={styles.link}>
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.navGroup}>
              {/* Follow us on */}
              <div className={styles.navColumn}>
                <h3 className={styles.columnTitle}>Follow us on</h3>
                <div className={styles.socialIcons}>
                  {SOCIAL_LINKS.map((social) => (
                    <Link key={social.platform} href={social.href} aria-label={social.ariaLabel}>
                      <Image 
                        src={
                          social.platform === 'YouTube' ? YouTubeIcon :
                          social.platform === 'Instagram' ? InstagramIcon :
                          social.platform === 'LinkedIn' ? LinkedInIcon :
                          TwitterIcon
                        } 
                        alt={social.platform} 
                        width={24} 
                        height={24} 
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other section */}
              <div className={styles.navColumn}>
                <h3 className={styles.columnTitle}>{FOOTER_SECTIONS[4].title}</h3>
                <div className={styles.columnLinks}>
                  {FOOTER_SECTIONS[4].links.map((link) => (
                    <Link key={link.text} href={link.href} className={styles.link}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className={styles.copyright}>
          ©️ 2024 InterviewBit Technologies Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
