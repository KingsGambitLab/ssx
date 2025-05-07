'use client';

import { useEffect } from 'react';
import { trackSectionView } from '@lib/tracking/utils';

export function useTrackSectionViews(sectionIds: string[], debounceTimeMs = 3000) {
  useEffect(() => {
    const cleanup = trackSectionView({ sectionIds, debounceTimeMs });
    return cleanup;
  }, [sectionIds, debounceTimeMs]);
}
