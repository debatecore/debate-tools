"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { langsArray, langsPublicBlacklist, language } from "@/types/language";
import { LangContext } from "@/contexts/LangContext";
import { debateConf, defaultDebateConf } from "@/types/debate";
import { DebateContext } from "@/contexts/DebateContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [stateLang, setStateLang] = useState<language>("pl");
  const [stateDebateConf, setStateDebateConf] =
    useState<debateConf>(defaultDebateConf);

  useEffect(() => {
    if (!localStorage) return;
    const localLang = localStorage.getItem("lang");
    // prettier-ignore
    if (localLang && !langsPublicBlacklist.includes(localLang as language) && langsArray.includes(localLang as language)) {
      setStateLang(localLang as language);
    }
  }, []);
  return (
    <html>
      <head>
        <title>Debate Tools</title>
        <meta
          name="description"
          content="Tools for conducting and preparing debates in English and Polish."
        />
      </head>
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        <LangContext.Provider
          value={{
            lang: stateLang,
            setLang: (lang) => {
              setStateLang(lang);
              localStorage.setItem("lang", lang);
            },
          }}
        >
          <DebateContext.Provider
            value={{
              conf: stateDebateConf,
              setConf: (conf) => setStateDebateConf(conf),
            }}
          >
            {children}
          </DebateContext.Provider>
        </LangContext.Provider>
      </body>
    </html>
  );
}
