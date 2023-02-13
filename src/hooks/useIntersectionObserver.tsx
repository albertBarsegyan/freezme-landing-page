import { useEffect, useState } from "react";

type IntersectionHookInit = IntersectionObserverInit;

type OnIntersection = (isIntersecting: boolean, ob: IntersectionObserver) => boolean | void;

const DefaultOptions: IntersectionHookInit = {
  root: null,
  threshold: 0,
};

const DefaultOnIntersection: OnIntersection = (isIntersecting) => {
  if (isIntersecting) return false;
};

export function useIntersection({
  elementId,
  onIntersection = DefaultOnIntersection,
  options = DefaultOptions,
}: {
  elementId: string;
  onIntersection?: OnIntersection;
  options?: IntersectionHookInit;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const elementById = typeof window !== "undefined" ? document.getElementById(elementId) : null;
    if (!elementById) return;

    const ob = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const isElementIntersecting = entry.isIntersecting;
        // if (onIntersection(isElementIntersecting, ob) === false) {
        //   ob.disconnect();
        // }
        setIsIntersecting(isElementIntersecting);
      }
    }, options);

    ob.observe(elementById);
    return () => {
      ob.disconnect();
    };
  }, [elementId, onIntersection, options]);

  return [isIntersecting] as const;
}
