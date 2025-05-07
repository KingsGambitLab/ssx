"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id.split("__")[0]);
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px', // balances top and bottom equally
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }

    );


    ids.forEach((id) => {
      const element = document.getElementById(`${id}__content`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
