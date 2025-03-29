import { Grid, ThemeConfig } from 'antd';

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

  return {
    // Matches @mixin mobile
    isMobile: !screens.md, // < 768px

    // Matches @mixin tablet
    isTablet: screens.md && !screens.lg, // >= 768px and < 1280px

    // Matches @mixin desktop-only
    isDesktop: screens.lg && !screens.xl, // >= 1280px and < 1560px

    // Matches @mixin large-desktop-only
    isLargeDesktop: screens.xl, // >= 1560px

    // Matches @mixin mobile-only
    isMobileOnly: screens.xs && !screens.md, // >= 360px and < 768px

    // Matches @mixin tablet-only
    isTabletOnly: screens.md && !screens.lg, // >= 768px and < 1280px

    // Matches @mixin above-mobile
    isAboveMobile: screens.sm, // > 480px

    // Matches @mixin above-tablet
    isAboveTablet: screens.md, // > 768px
  };
};