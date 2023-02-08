import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TransitionLayout } from "../src/components/Layouts/TransitionLayout/TransitionLayout";
import ModalProvider from "../src/components/contexts/modal/Modal.context";
import { ReactQueryDevtools } from "react-query/devtools";
import { use100VhFix } from "../src/hooks/use100VhFix";

function App({ Component, pageProps }: AppProps) {
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
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ModalProvider>
      </TransitionLayout>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
