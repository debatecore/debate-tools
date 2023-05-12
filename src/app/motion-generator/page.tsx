"use client";
import { language } from "@/contexts/LangContext";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useState } from "react";

// NOTE: this is a prototype to be rewritten to make use of an API, DB or at least better typings

type motion = {
  motion: string;
  info?: string;
  lang: language;
  source: string;
};

export default function PageMotionGen() {
  const buttonstyle = `
    bg-zinc-700 p-2 rounded hover:bg-zinc-600 border border-transparent
    hover:border-zinc-400 disabled:cursor-not-allowed
  `;
  return (
    <>
      <div className="text-center px-2 py-12">{useLang("motionGen")}</div>
      <h2 className="text-center font-serif text-3xl">
        {"THW abolish the UN Security Council."}
      </h2>
      <p className="text-center text-zinc-400">
        {"Source: Musketeers of Words 2023 - Group Phase"}
      </p>
      <div className="flex flex-row justify-between gap-2 max-w-lg mx-auto pt-12">
        <Link href="/" tabIndex={-1}>
          <button className={buttonstyle}>{"Back to menu"}</button>
        </Link>
        <button disabled className={buttonstyle}>
          {"Generate another"}
        </button>
      </div>
    </>
  );
}
