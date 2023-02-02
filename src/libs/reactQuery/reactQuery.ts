import { QueryClient } from "react-query";

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 20,
      refetchOnWindowFocus: false,
    },
  },
});
