import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

const ScrollTop = ({ children }: { children: ReactElement | null }) => {
  const router = useRouter();
  const { pathname, asPath } = router;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (asPath.includes("#")) {
        const element = document.querySelector(asPath?.replace("/", ""));
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [asPath, pathname]);

  return children || null;
};

export default ScrollTop;
