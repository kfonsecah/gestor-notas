import { NotesProvider } from "@/context/NotesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotesProvider>
      <Component {...pageProps} />
    </NotesProvider>
  );
}

export default MyApp;
