export function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function getDeviceType() {
  if (/tablet|iPad/i.test(navigator.userAgent)) {
    return 'tablet';
  }
  if (isMobile()) {
    return 'mobile';
  }
  return 'desktop';
}

export default {
  isMobile,
  getDeviceType,
}