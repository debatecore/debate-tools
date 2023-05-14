"use client";
import { useLang } from "@/lib/useLang";
import Link from "next/link";

export default function PageBracketGen() {
  const buttonstyle = `
    bg-zinc-700 p-2 rounded hover:bg-zinc-600 border border-transparent
    hover:border-zinc-400 disabled:cursor-not-allowed
  `;
  return (
    <>
      <div className="text-center font-serif text-4xl pt-12">
        {useLang("ladderGen")}
      </div>
      <div className="flex flex-row gap-2 justify-between max-w-lg mx-auto py-4">
        <Link tabIndex={-1} href="/">
          <button className={buttonstyle}>Back to menu</button>
        </Link>
      </div>
    </>
  );
}
