'use client';
// eslint-disable @typescript-eslint/no-unused-vars
import tracker from '@lib/tracking';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import attribution from '@lib/attribution';
import { getURLWithUTMParams, getUTMPropagationParams, initializeUtmPropagation } from '@utils/common/url';
import { lazyLoadGtm, pushServerEvents, trackSectionView } from '@lib/tracking/utils';
import useUser from '@/hooks/useUser';

export default function Analytics({
  product,
  subProduct,
  experiments,
}: {
  product: string;
  subProduct: string;
  experiments: Record<string, string>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    data: userDetails,
    isError: isUserFetchError,
  } = useUser();

  // TODO: remove this as curently not setting experiments as data attributes
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchExperiments = () => {
    const elements = document.querySelectorAll('[data-variant-key]');
    const experiments: Record<string, string> = {};
    elements.forEach((element) => {
      const key = element.getAttribute('data-variant-key');
      const value = element.getAttribute('data-variant-value');
      if (key && value) {
        experiments[key] = value;
      }
    });

    return experiments;
  }

  useEffect(() => {
    initializeUtmPropagation();
    lazyLoadGtm();
    pushServerEvents();
    trackSectionView();
  }, []);

  useEffect(() => {
    const pageUrl = getURLWithUTMParams(window.location.href);

    tracker.pushtoPendingList = true;
    tracker.superAttributes = {
      attributes: {
        product,
        subproduct: subProduct,
        page_path: pathname,
        page_url: pageUrl,
        params: searchParams ? Object.fromEntries(searchParams.entries()) : {},
        utm_propagation_params: getUTMPropagationParams(),
        experiments: Object.values(experiments).join(','),
        ab_experiments: experiments,
      },
      custom: {},
    };
    attribution.setPlatform();
    attribution.setProduct();
    attribution.experiment = Object.values(experiments).join(',');
    tracker.pageview({
      page_url: pageUrl,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    if (userDetails?.isloggedIn || isUserFetchError) {
      tracker.isLoggedIn = !!userDetails?.isloggedIn;
      tracker.pushtoPendingList = false;
    }
  }, [userDetails, isUserFetchError]);

  return null;
}
