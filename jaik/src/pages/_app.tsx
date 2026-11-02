import type { AppProps } from "next/app";
import AppProvider from "@/providers/AppProvider";
import "@/app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
