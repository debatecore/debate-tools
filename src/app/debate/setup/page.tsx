"use client";

import { DebateSetting } from "@/components/DebateSetting";
import {
  DebateContext,
  debateType,
  defaultDebate,
  sampleDebates,
} from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useContext } from "react";

export default function PageDebateSetup() {
  const buttonstyle = `
    p-2 bg-zinc-700 hover:bg-zinc-600 hover:text-zinc-100 
    border border-transparent hover:border-zinc-400 rounded
  `;
  const debate = useContext(DebateContext);
  return (
    <>
      <div className="text-center pt-14">
        <h1 className="text-3xl font-serif text-zinc-50">
          {useLang("debateConfig")}
        </h1>
      </div>
      <div className="flex flex-col max-w-md mx-auto gap-2 py-8 text-center">
        <DebateSetting setting="motion" />
        <DebateSetting setting="proTeam" />
        <DebateSetting setting="oppTeam" />
        <DebateSetting setting="speechTime" />
        <DebateSetting setting="protectedTime" />
      </div>
      <div className="flex flex-row max-w-md mx-auto gap-2">
        <Link href="/" className="mr-auto">
          <button tabIndex={-1} className={buttonstyle}>
            {useLang("backToMenu")}
          </button>
        </Link>
        <button
          className={buttonstyle}
          onClick={() => {
            debate?.setData(defaultDebate);
          }}
        >
          {useLang("resetDebateConfig")}
        </button>
        <Link href="/debate">
          <button tabIndex={-1} className={buttonstyle}>
            {useLang("conductDebate")}
          </button>
        </Link>
      </div>
      <div className="flex flex-row justify-end max-w-md mx-auto py-1">
        <button
          className="text-zinc-400 hover:underline pr-1"
          onClick={() => {
            let previousDebate = debate?.data;
            let newDebate: debateType =
              sampleDebates[Math.floor(Math.random() * sampleDebates.length)];
            while (previousDebate === newDebate) {
              newDebate =
                sampleDebates[Math.floor(Math.random() * sampleDebates.length)];
            }
            debate?.setData(newDebate);
          }}
        >
          {useLang("sampleDebate")}
        </button>
      </div>
    </>
  );
}
