"use client";
import { DebateConfStringsPanel } from "@/components/DebateConfStringsPanel";
import { LinkButton } from "@/components/LinkButton";
import { IconList } from "@/components/icons/List";
import { IconPlayCircle } from "@/components/icons/PlayCircle";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { useContext } from "react";

export default function OxfordDebateSetup() {
  const debateContext = useContext(DebateContext);
  return (
    <div>
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("oxfordDebateConfiguration")}
      </h1>
      <p className="text-center text-neutral-500">
        {debateContext.conf.motion ||
          useLang("oxfordDebateConfigurationFlavortext")}
      </p>
      <div className="max-w-2xl mx-auto mt-8 flex flex-col gap-4 px-4">
        <DebateConfStringsPanel />
        <hr className="border-b-2 rounded border-neutral-800 my-2" />
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <LinkButton href="/" text="Main Menu" icon={IconList} />
          <LinkButton href="/" text="Conduct debate" icon={IconPlayCircle} />
        </div>
      </div>
    </div>
  );
}
