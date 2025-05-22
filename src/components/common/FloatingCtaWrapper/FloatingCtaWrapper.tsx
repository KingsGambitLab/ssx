import { useEffect, useRef } from 'react';

import { useDeviceType } from '@hooks';

import styles from './FloatingCtaWrapper.module.scss';

interface FloatingCtaWrapperProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export default function FloatingCtaWrapper({
  targetId,
  children,
  className = "",
  isLoading = false
}: FloatingCtaWrapperProps) {
  const { isMobile } = useDeviceType();
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingStickyCtaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Don't set up floating CTA if loading
    if (isLoading) return;

    const targetElement = document.getElementById(targetId);
    console.log("targetElement", targetElement);

    if (!targetElement || !isMobile) return;

    // Create the floating sticky cta element
    let floatingCta = document.getElementById("floating-sticky-cta");

    if (!floatingCta) { 
      floatingCta = document.createElement("div");
      floatingCta.id = "floating-sticky-cta";
      floatingCta.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: white;
        border-radius: 0.8rem 0.8rem 0 0;
        box-shadow: 0 -0.2rem 0.4rem 0px rgba(18, 18, 18, 0.16);
        z-index: 100;
        opacity: 0;
        pointer-events: none;
        transform: translateY(100%);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
        text-align: center;
      `;
      document.body.appendChild(floatingCta);
    }

    floatingStickyCtaRef.current = floatingCta as HTMLDivElement;

    // Clear previous content if any
    floatingStickyCtaRef.current.innerHTML = "";

     // Clone the child button (assuming single child is a button or container with a button)
    const originalBtn = ctaRef.current?.querySelector("div") || ctaRef.current?.querySelector("button");

    console.log("originalBtn", originalBtn);
    if (!originalBtn) return;
    
     if (originalBtn) {
       const clonedBtn = originalBtn.cloneNode(true) as HTMLElement;
       clonedBtn.addEventListener("click", () => {
         targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
       });
       floatingStickyCtaRef.current?.appendChild(clonedBtn);
     }
    
     // Setup IntersectionObserver on the form
     const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          floatingStickyCtaRef.current!.style.opacity = "0";
          floatingStickyCtaRef.current!.style.pointerEvents = "none";
          floatingStickyCtaRef.current!.style.transform = "translateY(100%)";
        } else {
          floatingStickyCtaRef.current!.style.opacity = "1";
          floatingStickyCtaRef.current!.style.pointerEvents = "auto";
          floatingStickyCtaRef.current!.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1 }
     );
    
    
     observer.observe(originalBtn);

     return () => {
       observer.disconnect();
       if (floatingStickyCtaRef.current && floatingStickyCtaRef.current.parentElement) {
         floatingStickyCtaRef.current.parentElement.removeChild(floatingStickyCtaRef.current);
       }
     };
  }, [ctaRef, floatingStickyCtaRef, targetId, className, isMobile, isLoading])

  return <div ref={ctaRef} className={styles.floatingCtaWrapper}>{children}</div>;
}