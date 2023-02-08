import { useEffect, useRef, useState } from "react";

type IntersectionHookInit = IntersectionObserverInit;

type OnIntersection = (isIntersecting: boolean, ob: IntersectionObserver) => boolean | void;

const DefaultOptions: IntersectionHookInit = {
  root: null,
  threshold: 0,
};

const DefaultOnIntersection: OnIntersection = (isIntersecting) => {
  if (isIntersecting) return false;
};

export function useIntersection(
  onIntersection: OnIntersection = DefaultOnIntersection,
  options: IntersectionHookInit = DefaultOptions
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elemRef = useRef<null | Element | undefined>(null);

  const setElem = (elem: any) => {
    elemRef.current = elem;
  };

  useEffect(() => {
    if (!elemRef.current) return;
    let isUnmounted = false;
    const ob = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (isUnmounted) return;

        const isElementIntersecting = entry.isIntersecting;
        if (onIntersection(isElementIntersecting, ob) === false) {
          ob.disconnect();
        }
        setIsIntersecting(isElementIntersecting);
      }
    }, options);

    ob.observe(elemRef.current);
    return () => {
      ob.disconnect();
      isUnmounted = true;
    };
  }, [onIntersection]);

  return [isIntersecting, setElem] as const;
}
