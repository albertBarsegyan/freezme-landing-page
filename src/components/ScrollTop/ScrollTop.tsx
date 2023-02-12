import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const ScrollTop = ({ children }: { children: ReactElement | null }) => {
  const location = useRouter();
  const { pathname } = location;

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
