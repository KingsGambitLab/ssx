'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Affix, Menu } from 'antd';
import type { MenuProps } from 'antd';

import { useDeviceType } from '@hooks/useDeviceType';
import {
  trackEvent,
  pageTrackingEvents,
  pageTrackingSources,
} from '@modules/sst/degree/utils/tracking';

import styles from './FloatingNavbar.module.scss';

export interface NavItem {
  label: string;
  key: string;
  href: string;
  isNew?: boolean;
}

interface FloatingNavbarProps {
  items: NavItem[];
  activeSection?: string;
}

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ items, activeSection: initialActiveSection }) => {
  const { isMobile, isTablet } = useDeviceType();
  const [activeSection, setActiveSection] = useState(initialActiveSection || '');
  const menuWrapperRef = useRef<HTMLDivElement>(null);

  // Track the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Get all section IDs from the items
      const sectionIds = items.map(item => item.href.replace('#', ''));
      
      // Find the section that is currently in view
      let currentSection = '';
      let minDistance = Infinity;
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          // If this section is closer to the top of the viewport than the previous closest
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items, activeSection]);

  // Scroll active menu item into view when it changes
  useEffect(() => {
    if ((isMobile || isTablet) && activeSection && menuWrapperRef.current) {
      const activeMenuItem = menuWrapperRef.current.querySelector('.ant-menu-item-selected');
      if (activeMenuItem) {
        // Calculate the scroll position to center the active item
        const menuWrapper = menuWrapperRef.current;
        const menuWrapperWidth = menuWrapper.offsetWidth;
        const activeItemLeft = (activeMenuItem as HTMLElement).offsetLeft;
        const activeItemWidth = (activeMenuItem as HTMLElement).offsetWidth;
        
        // Center the active item in the menu wrapper
        const scrollPosition = activeItemLeft - (menuWrapperWidth / 2) + (activeItemWidth / 2);
        
        // Smooth scroll to the position
        menuWrapper.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection, isMobile, isTablet]);

  const scrollToSection = (key: string) => {
    const href = items.find(item => item.key === key)?.href || '';
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const yOffset = - 50; // Additional offset for padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Convert NavItems to Ant Design Menu items
  const menuItems: MenuProps['items'] = items.map(item => ({
    key: item.key,
    label: (
      <span>
        {item.label}
        {item.isNew && <span className={styles.newBadge}>New</span>}
      </span>
    ),
  }));

  const onClick: MenuProps['onClick'] = (e) => {
    trackEvent.click({
      clickType: pageTrackingEvents.ctaClicked,
      clickText: e.key,
      clickSource: pageTrackingSources.FloatingNavbar,
    });
    scrollToSection(e.key);
  };

  // Find the key of the active section
  const activeKey = items.find(item => item.href.replace('#', '') === activeSection)?.key || '';

  // For desktop, use fixed positioning at the bottom
  if (!isMobile && !isTablet) {
    return (
      <div className={`${styles.floatingNav} ${styles.bottom} ${styles.fixed}`}>
        <Menu
          mode="horizontal"
          selectedKeys={activeKey ? [activeKey] : []}
          onClick={onClick}
          items={menuItems}
          className={styles.menu}
        />
      </div>
    );
  }

  // For mobile and tablet, use Affix at the top
  return (
    <Affix style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      <div className={`${styles.floatingNav} ${styles.top}`}>
        <div className={styles.menuWrapper} ref={menuWrapperRef}>
          <Menu
            mode="horizontal"
            selectedKeys={activeKey ? [activeKey] : []}
            onClick={onClick}
            items={menuItems}
            className={styles.menu}
          />
        </div>
      </div>
    </Affix>
  );
};

export default FloatingNavbar;
