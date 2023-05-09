"use client";
import { IconChevronDown } from "@/components/icons/ChevronDown";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useState } from "react";

export default function PageIndex() {
  const [langsOpen, setLangsOpen] = useState<boolean>(false);
  const debateTools = useLang("debateTools");
  const madeWithLove = useLang("madeWithLove");
  const debateUtility = useLang("oxfDebateUtility");
  const ladderGen = useLang("ladderGen");
  return (
    <>
      <div className="text-center py-12">
        <h1 className="text-4xl font-serif">{debateTools}</h1>
        <p className="text-zinc-400">{madeWithLove}</p>
      </div>
      <div className="buttonflex">
        <Link href="/">
          <button>{debateUtility}</button>
        </Link>
        <button disabled>{ladderGen}</button>
      </div>

      <button
        className={`langbtn ${langsOpen ? "opened" : ""}`}
        onClick={() => {
          setLangsOpen(!langsOpen);
        }}
      >
        English
        <IconChevronDown />
      </button>
      <div className={`langpane ${langsOpen ? "" : "hide"}`}>
        <button>English</button>
        <button>Polski</button>
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
