import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { createContext } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppContext as AppContextType } from "../types/form.type";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const AnyComponent = Component as any; // TODO figure out this thing
  return (
    <QueryClientProvider client={queryClient}>
      <AnyComponent {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
