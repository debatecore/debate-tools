"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { languages } from "@/types/language";
import { LangContext } from "@/contexts/LangContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [stateLang, setStateLang] = useState<languages>("en");
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
            },
          }}
        >
          {children}
        </LangContext.Provider>
      </body>
    </html>
  );
}
