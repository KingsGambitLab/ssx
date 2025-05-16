import { useEffect } from 'react';

function getElementOffsetFromTop(
  element: HTMLElement,
  container: HTMLElement | Window,
): number {
  const rect = element.getBoundingClientRect();
  const scrollTop =
    container instanceof Window ? container.scrollY : container.scrollTop;
  return rect.top + scrollTop;
}

function getHighlightedEleHeight(
  windowScrollTop: number,
  firstStepTop: number,
  lastStepTop: number,
): number {
  return Math.min(
    windowScrollTop + window.innerHeight * 0.6 - firstStepTop,
    lastStepTop - firstStepTop,
  );
}

interface UseStepTimelineProps {
  className: string;
  containerClass?: string; // optional, defaults to window
}

export const useStepTimeline = ({
  className,
  containerClass,
}: UseStepTimelineProps) => {
  useEffect(() => {
    const firstStep = document.querySelector<HTMLElement>(
      `.${className}__step-container-first`,
    );
    const growingDiv = document.querySelector<HTMLElement>(
      `.${className}__growing-div`,
    );
    const lastStep = document.querySelector<HTMLElement>(
      `.${className}__step-container-last`,
    );

    const container = containerClass
      ? document.querySelector<HTMLElement>(`.${containerClass}`)
      : null;

    const scrollTarget: HTMLElement | Window = container ?? window;

    if (!(firstStep && growingDiv && lastStep)) return;

    const firstStepTop = getElementOffsetFromTop(firstStep, scrollTarget);
    const lastStepTop = getElementOffsetFromTop(lastStep, scrollTarget);

    const onScroll = () => {
      const scrollTop =
        scrollTarget instanceof Window
          ? scrollTarget.scrollY
          : scrollTarget.scrollTop;

      if (scrollTop <= lastStepTop + 350) {
        const height = getHighlightedEleHeight(
          scrollTop,
          firstStepTop,
          lastStepTop,
        );
        growingDiv.style.height = `${height}px`;
      }
    };

    // Attach scroll listener
    if (scrollTarget instanceof Window) {
      scrollTarget.addEventListener('scroll', onScroll);
    } else {
      scrollTarget.addEventListener('scroll', onScroll);
    }

    // Initial run
    onScroll();

    // Cleanup
    return () => {
      if (scrollTarget instanceof Window) {
        scrollTarget.removeEventListener('scroll', onScroll);
      } else {
        scrollTarget.removeEventListener('scroll', onScroll);
      }
    };
  }, [className, containerClass]);
};
