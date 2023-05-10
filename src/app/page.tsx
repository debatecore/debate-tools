"use client";
import { IconChevronDown } from "@/components/icons/ChevronDown";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { useTheme } from "next-themes";
import { IconSquare } from "@/components/icons/Square";
import { IconCheckSquare } from "@/components/icons/CheckSquare";

export default function PageIndex() {
  const [langsOpen, setLangsOpen] = useState<boolean>(false);
  const [themesOpen, setThemesOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const langContext = useContext(LangContext);

  const debateTools = useLang("debateTools");
  const madeWithLove = useLang("madeWithLove");
  const debateUtility = useLang("oxfDebateUtility");
  const ladderGen = useLang("ladderGen");
  const motionGen = useLang("motionGen");

  const themeStr = useLang("theme");
  const themeSystem = useLang("themeSystem");
  const themeDark = useLang("themeDark");
  const themeLight = useLang("themeLight");
  const themeProjector = useLang("themeProjector");

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <div className="text-center py-12 pt-14">
        <h1 className="text-4xl font-serif text-zinc-50">{debateTools}</h1>
        <p className="text-zinc-400">{madeWithLove}</p>
      </div>
      <div className="buttonflex">
        <Link href="/">
          <button>{debateUtility}</button>
        </Link>
        <button disabled>{ladderGen}</button>
        <button disabled>{motionGen}</button>
      </div>

      <button
        className={`themebtn ${themesOpen ? "opened" : ""}`}
        onClick={() => {
          setThemesOpen(!themesOpen);
        }}
      >
        <span className="mr-auto">
          {themesOpen ? themeStr : mounted ? theme : "..."}
        </span>
        <IconChevronDown />
      </button>
      <div className={`themepane ${themesOpen ? "" : "hide"}  `}>
        <button
          onClick={() => {
            setTheme("system");
            setThemesOpen(false);
          }}
        >
          {themeSystem || "system"}
          {mounted ? (
            theme == "system" ? (
              <IconCheckSquare />
            ) : (
              <IconSquare />
            )
          ) : (
            "..."
          )}
        </button>
        <button
          onClick={() => {
            setTheme("light");
            setThemesOpen(false);
          }}
        >
          {themeLight || "light"}
          {mounted ? (
            theme == "light" ? (
              <IconCheckSquare />
            ) : (
              <IconSquare />
            )
          ) : (
            "..."
          )}
        </button>
        <button
          onClick={() => {
            setTheme("dark");
            setThemesOpen(false);
          }}
        >
          {themeDark || "dark"}
          {mounted ? (
            theme == "dark" ? (
              <IconCheckSquare />
            ) : (
              <IconSquare />
            )
          ) : (
            "..."
          )}
        </button>
        <button
          onClick={() => {
            setTheme("projector");
            setThemesOpen(false);
          }}
        >
          {themeProjector || "projector"}
          {mounted ? (
            theme == "projector" ? (
              <IconCheckSquare />
            ) : (
              <IconSquare />
            )
          ) : (
            "..."
          )}
        </button>
      </div>

      <button
        className={`langbtn ${langsOpen ? "opened" : ""}`}
        onClick={() => {
          setLangsOpen(!langsOpen);
        }}
      >
        {langContext?.lang === "pl" ? "polski" : "english"}
        <IconChevronDown />
      </button>
      <div className={`langpane ${langsOpen ? "" : "hide"}`}>
        <button
          onClick={() => {
            langContext?.setLang("en");
            setLangsOpen(false);
          }}
          className={langContext?.lang == "en" ? "hidden" : ""}
        >
          english
        </button>
        <button
          onClick={() => {
            langContext?.setLang("pl");
            setLangsOpen(false);
          }}
          className={langContext?.lang == "pl" ? "hidden" : ""}
        >
          polski
        </button>
      </div>
    </>
  );
}
