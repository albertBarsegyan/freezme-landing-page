import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

const ScrollTop = ({ children }: { children: ReactElement | null }) => {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
};

export default ScrollTop;
