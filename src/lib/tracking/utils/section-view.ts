import tracker from '@lib/tracking';

type trackSectionViewProps = {
  sectionIds?: string[];
  threshold?: number;
  rootMargin?: string;
  debounceTimeMs?: number;
}

const DEFAULT_OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.05,
};

const cooldownMap = new Map<string, number>();

function getScrollDepth(): number {
  const scrollY = window.scrollY;
  const docScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const depth = docScrollableHeight > 0 ? Math.min((scrollY / docScrollableHeight) * 100, 100) : 0;
  return Math.round(depth);
}

function pushSectionViewToGTM(sectionId: string) {
  tracker.sectionView({
    section_name: sectionId,
    custom: {
      scroll_depth: getScrollDepth(),
    },
  });
}

export default function trackSectionView({
  sectionIds = [],
  threshold = 0.05,
  rootMargin = '0px',
  debounceTimeMs = 2000,
}: trackSectionViewProps = {}) { 
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => { 
    const now = Date.now();
    const pagePath = window.location.pathname;

    entries.forEach((entry) => { 
      const sectionId = entry.target.id;
      const el = document.getElementById(sectionId);

      if (!entry.isIntersecting || !sectionId || !el) return;

      const key = `${pagePath}::${sectionId}`;
      const lastTracked = cooldownMap.get(key) || 0;

      if (now - lastTracked > debounceTimeMs) {
        cooldownMap.set(key, now);
        pushSectionViewToGTM(sectionId);
      }
    })
  }, {
    ...DEFAULT_OBSERVER_OPTIONS,
    rootMargin,
    threshold,
  });

  const allSectionIds = new Set<string>(
    Array.isArray(sectionIds) ? sectionIds.filter((id) => typeof id === 'string' && id.trim()) : []
  );

  const sectionContainers = document.querySelectorAll('.sr-container');

  sectionContainers.forEach((container) => {
    const parentWithId = container.closest('section[id]');
    if (parentWithId && parentWithId instanceof HTMLElement) {
      allSectionIds.add(parentWithId.id);
    }
  });

  allSectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetParent !== null) {
      observer.observe(el);
    }
  });

  window.addEventListener('beforeunload', () => {
    cooldownMap.clear();
  });

  return () => observer.disconnect();
}