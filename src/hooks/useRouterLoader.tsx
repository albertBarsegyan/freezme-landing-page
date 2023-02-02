import { NextRouter } from "next/router";
import { useEffect, useState } from "react";

export function useRouterLoader(router: NextRouter) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsLoading(true));

    router.events.on("routeChangeComplete", () => setIsLoading(false));

    router.events.on("routeChangeError", () => setIsLoading(false));
  }, [router.events, router.pathname]);

  return { isLoading };
}
