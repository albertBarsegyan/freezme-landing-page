import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TransitionLayout } from "../src/components/Layouts/TransitionLayout/TransitionLayout";
import ModalProvider from "../src/components/contexts/modal/Modal.context";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouterLoader } from "../src/hooks/useRouterLoader";
import { useRouter } from "next/router";
import { Loader, LoaderVariant } from "../src/components/Loader/Loader";
import { use100VhFix } from "../src/hooks/use100VhFix";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isLoading } = useRouterLoader(router);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            staleTime: 1000 * 20,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  use100VhFix();

  return (
    <QueryClientProvider client={queryClient}>
      <TransitionLayout>
        <ModalProvider>
          <Loader isLoading={isLoading} variant={LoaderVariant.FullScreen} />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ModalProvider>
      </TransitionLayout>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
