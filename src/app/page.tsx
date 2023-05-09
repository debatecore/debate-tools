"use client";
import { IconChevronDown } from "@/components/icons/ChevronDown";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useContext, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { IconSettings } from "@/components/icons/Settings";
import { useTheme } from "next-themes";

export default function PageIndex() {
  const [langsOpen, setLangsOpen] = useState<boolean>(false);
  const [themesOpen, setThemesOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const langContext = useContext(LangContext);
  const debateTools = useLang("debateTools");
  const madeWithLove = useLang("madeWithLove");
  const debateUtility = useLang("oxfDebateUtility");
  const ladderGen = useLang("ladderGen");
  const motionGen = useLang("motionGen");
  return (
    <>
      <div className="text-center py-12 pt-14">
        <h1 className="text-4xl font-serif">{debateTools}</h1>
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
          {theme || "theme"}
          {/* <IconSettings /> */}
        </span>
        {/* <IconSettings /> */}
        <IconChevronDown />
      </button>
      <div className={`themepane ${themesOpen ? "" : "hide"}  `}>
        <button
          onClick={() => {
            setTheme("system");
            setThemesOpen(false);
          }}
        >
          system
        </button>
        <button
          onClick={() => {
            setTheme("light");
            setThemesOpen(false);
          }}
        >
          light
        </button>
        <button
          onClick={() => {
            setTheme("dark");
            setThemesOpen(false);
          }}
        >
          dark
        </button>
        <button
          onClick={() => {
            setTheme("projector");
            setThemesOpen(false);
          }}
        >
          projector
        </button>
      </div>

      <button
        className={`langbtn ${langsOpen ? "opened" : ""}`}
        onClick={() => {
          setLangsOpen(!langsOpen);
        }}
      >
        {langContext?.lang === "pl" ? "Polski" : "English"}
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
          English
        </button>
        <button
          onClick={() => {
            langContext?.setLang("pl");
            setLangsOpen(false);
          }}
          className={langContext?.lang == "pl" ? "hidden" : ""}
        >
          Polski
        </button>
      </div>

      {/* <div className={`langpane ${langsOpen ? "" : "hidden"}`}>
        <button>English</button>
        <button>Polski</button>
      </div> */}

      {/* <button
        className="settingsbtn"
        onClick={() => {
          setSettingsOpen(!settingsOpen);
        }}
      >
        {!settingsOpen ? <IconSettings /> : <IconClose />}
      </button>
      <div className={`settingspane ${settingsOpen ? "" : "hidden"}`}>
        <h1>{settings}</h1>
        <h2>theme</h2>
        <button>
          <p>system theme</p>
          <IconCheckSquare />
        </button>
        <button>
          <p>dark theme </p>
          <IconSquare />
        </button>
        <button>
          <p>light theme</p>
          <IconSquare />
        </button> 
      </div>*/}
    </>
  );
}
