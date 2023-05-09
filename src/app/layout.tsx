"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { LangContext } from "@/contexts/LangContext";
import "./globals.css";
import { ThemeProvider } from "next-themes";

type language = "en" | "pl";
export type { language };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialFetch, setInitialFetch] = useState<boolean>(false);
  const [lang, setLang] = useState<language>("en");
  useEffect(() => {
    if (typeof localStorage == "undefined") return;
    if (initialFetch) {
      localStorage.setItem("lang", lang);
    } else {
      setInitialFetch(true);
      let storedLang = localStorage.getItem("lang");
      if (storedLang) {
        setLang(storedLang === "pl" ? "pl" : "en");
      }
    }
  }, [initialFetch, lang]);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LangContext.Provider value={{ lang, setLang }}>
          <ThemeProvider themes={["light", "dark", "projector"]}>
            {children}
          </ThemeProvider>
        </LangContext.Provider>
      </body>
    </html>
  );
}
