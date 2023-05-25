"use client";
import { useEffect, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { ThemeProvider } from "next-themes";
import { language } from "@/contexts/LangContext";
import "./globals.css";
import {
  DebateContext,
  debateStorageField,
  debateType,
  defaultDebate,
} from "@/contexts/DebateContext";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialFetch, setInitialFetch] = useState<boolean>(false);
  const [lang, setLang] = useState<language>("en");
  const [debate, setDebate] = useState<debateType>(defaultDebate);

  useEffect(() => {
    if (typeof localStorage == "undefined") return;
    if (initialFetch) {
      localStorage.setItem("lang", lang);
      localStorage.setItem(debateStorageField, JSON.stringify(debate));
    } else {
      setInitialFetch(true);
      let storedLang = localStorage.getItem("lang");
      if (storedLang) {
        setLang(storedLang === "pl" ? "pl" : "en");
      }
      let storedDebate = localStorage.getItem(debateStorageField);
      if (storedDebate) {
        setDebate(JSON.parse(storedDebate) || defaultDebate);
      }
    }
  }, [initialFetch, lang, debate]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Head>
          <title>Debate Tools.</title>
          <meta
            name="description"
            content="Tools to aid in conducting oxford format debates."
          />
        </Head>
        <ThemeProvider themes={["light", "dark", "projector"]}>
          <LangContext.Provider value={{ lang, setLang }}>
            <DebateContext.Provider
              value={{ data: debate, setData: setDebate }}
            >
              {children}
            </DebateContext.Provider>
          </LangContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
