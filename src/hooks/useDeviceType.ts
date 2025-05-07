"use client";

import { Grid, ThemeConfig } from 'antd';
import { useMemo } from 'react';

// Match the SCSS breakpoints exactly
const BREAKPOINTS = {
  MOBILE: 360,
  LARGE_MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1560,
} as const;

const { useBreakpoint } = Grid;

// Configure theme with exact breakpoints
export const customTheme: ThemeConfig = {
  token: {
    // Screen breakpoints
    screenXS: BREAKPOINTS.MOBILE,
    screenXSMin: BREAKPOINTS.MOBILE,
    screenXSMax: BREAKPOINTS.LARGE_MOBILE - 1,
    screenSM: BREAKPOINTS.LARGE_MOBILE,
    screenSMMin: BREAKPOINTS.LARGE_MOBILE,
    screenSMMax: BREAKPOINTS.TABLET - 1,
    screenMD: BREAKPOINTS.TABLET,
    screenMDMin: BREAKPOINTS.TABLET,
    screenMDMax: BREAKPOINTS.DESKTOP - 1,
    screenLG: BREAKPOINTS.DESKTOP,
    screenLGMin: BREAKPOINTS.DESKTOP,
    screenLGMax: BREAKPOINTS.LARGE_DESKTOP - 1,
    screenXL: BREAKPOINTS.LARGE_DESKTOP,
    screenXLMin: BREAKPOINTS.LARGE_DESKTOP,
    screenXLMax: BREAKPOINTS.LARGE_DESKTOP,
    screenXXL: BREAKPOINTS.LARGE_DESKTOP,
    screenXXLMin: BREAKPOINTS.LARGE_DESKTOP
  }
};

export const useDeviceType = () => {
  const screens = useBreakpoint();
  const isWindowInitialized = Object.keys(screens).length > 0;

  return useMemo(() => ({
    // Matches @mixin mobile
    isMobile: isWindowInitialized ? !screens.md : false,

    // Matches @mixin tablet
    isTablet: isWindowInitialized ? (screens.md && !screens.lg) : false,

    // Matches @mixin tablet-or-mobile
    isTabletOrMobile: isWindowInitialized ? (!screens.md || (screens.md && !screens.lg)) : false,

    // Matches @mixin desktop-only
    isDesktop: isWindowInitialized ? (screens.lg && !screens.xl) : true,

    // Matches @mixin large-desktop-only
    isLargeDesktop: isWindowInitialized ? screens.xl : false,

    // Matches @mixin mobile-only
    isMobileOnly: isWindowInitialized ? (screens.xs && !screens.md) : false,

    // Matches @mixin tablet-only
    isTabletOnly: isWindowInitialized ? (screens.md && !screens.lg) : false,

    // Matches @mixin above-mobile
    isAboveMobile: isWindowInitialized ? screens.sm : true,

    // Matches @mixin above-tablet
    isAboveTablet: isWindowInitialized ? screens.md : true,
  }), [screens, isWindowInitialized]);
};