'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import classNames from "classnames";

import tracker from "@lib/tracking";

import styles from './NavItems.module.scss';

type NavItemsProps = {
  rootClassName?: string;
  newTagClassName?: string;
  navItemClassName?: string;
  data: {
    label: string;
    href: string;
    isNew?: boolean;
  }[];
  variant?: 'default' | 'scroll-tabs';
}

export default function NavItems({
  data,
  rootClassName = '',
  newTagClassName = '',
  navItemClassName = '',
  variant = 'default',
}: NavItemsProps) {
  const pathname = usePathname();

  const trackEvent = (clickText: string) => {
    tracker.click({
      click_type: 'navbar_item_clicked',
      click_text: clickText,
      click_source: 'navbar_items',
    });
  }

  const handleScrollTabClick = useCallback((href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    trackEvent(href);
  }, []);

  return (
    <div className={classNames(
      [styles.container, rootClassName],
      {
        [styles.containerScrollTabs]: variant === 'scroll-tabs',
      }
    )}>
      <div className={styles.navItemsContainer}>
        {data.map((item, index) => {
          const isSelected = pathname === item?.href;

          return (
            <div
              className={styles.navItem}
              key={index}
            >
              {variant === 'scroll-tabs' ? (
                <a
                  href={item?.href}
                  className={classNames(
                  styles.scrollNavItemText,
                  navItemClassName
                )}
                onClick={(e) => handleScrollTabClick(item?.href, e)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  prefetch={false}
                  href={item?.href}
                  target="_blank"
                  className={classNames(
                  styles.navItemText,
                  navItemClassName,
                  {
                    [styles.selectedNavItemText]: isSelected
                  }
                )}
                onClick={() => trackEvent(item?.label)}
                >
                  {item.label}
                </Link>
              )}
              {
                item.isNew && (
                  <div className={classNames(styles.newTag, newTagClassName)}>
                    New
                  </div>
                )
              }
            </div>
          )
        })}
      </div>
    </div>
  );
}
