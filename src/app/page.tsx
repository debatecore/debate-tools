"use client";
import { IconChevronDown } from "@/components/icons/ChevronDown";
import { IconClose } from "@/components/icons/Close";
import { IconSettings } from "@/components/icons/Settings";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useState } from "react";

export default function PageIndex() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const debateTools = useLang("debateTools");
  const madeWithLove = useLang("madeWithLove");
  const debateUtility = useLang("oxfDebateUtility");
  const ladderGen = useLang("ladderGen");
  const settings = useLang("settings");
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
        className="settingsbtn"
        onClick={() => {
          setSettingsOpen(!settingsOpen);
        }}
      >
        {!settingsOpen ? <IconSettings /> : <IconClose />}
      </button>
      <div className={`settingspane ${settingsOpen ? "" : "hidden"}`}>
        <h2>{settings}</h2>
        {/* <button>
          <p>theme</p>
          <IconChevronDown />
        </button>
        <button>
          <p>language: </p>
          <IconChevronDown />
        </button> */}
      </div>
    </>
  );
}
