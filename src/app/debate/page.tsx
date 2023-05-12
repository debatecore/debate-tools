"use client";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useContext, useState } from "react";

export default function PageDebate() {
  const debate = useContext(DebateContext);

  const [running, setRunning] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);

  const dot = `
    h-3 w-3 rounded-full border-2 border-zinc-400
  `;
  const dotfill = `
    bg-zinc-400
  `;
  const button = `
    bg-zinc-700 p-2 rounded hover:bg-zinc-600 border border-transparent
    hover:border-zinc-400 disabled:cursor-not-allowed
  `;

  const stageText = useLang(
    stage == 0
      ? "STAGE_0"
      : stage == 1
      ? "STAGE_1"
      : stage == 2
      ? "STAGE_2"
      : stage == 3
      ? "STAGE_3"
      : stage == 4
      ? "STAGE_4"
      : stage == 5
      ? "STAGE_5"
      : stage == 6
      ? "STAGE_6"
      : stage == 7
      ? "STAGE_7"
      : "STAGE_8"
  );
  const stageBtnText = useLang(
    stage == 0 && !running
      ? "STAGE_0_0_BTN"
      : stage == 0 && running
      ? "STAGE_0_1_BTN"
      : stage == 1 && !running
      ? "STAGE_1_0_BTN"
      : stage == 1 && running
      ? "STAGE_1_1_BTN"
      : stage == 2 && !running
      ? "STAGE_2_0_BTN"
      : stage == 2 && running
      ? "STAGE_2_1_BTN"
      : stage == 3 && !running
      ? "STAGE_3_0_BTN"
      : stage == 3 && running
      ? "STAGE_3_1_BTN"
      : stage == 4 && !running
      ? "STAGE_4_0_BTN"
      : stage == 4 && running
      ? "STAGE_4_1_BTN"
      : stage == 5 && !running
      ? "STAGE_5_0_BTN"
      : stage == 5 && running
      ? "STAGE_5_1_BTN"
      : stage == 6 && !running
      ? "STAGE_6_0_BTN"
      : stage == 6 && running
      ? "STAGE_6_1_BTN"
      : stage == 7 && !running
      ? "STAGE_7_0_BTN"
      : "STAGE_7_1_BTN"
  );

  return (
    <>
      <div className="text-center py-8 pt-16">
        <h1 className="font-serif text-4xl">
          {debate?.data.motion || "No motion given."}
        </h1>
        <p className="text-zinc-400">AN OXFORD FORMAT DEBATE</p>
      </div>
      <div className="flex flex-row py-4">
        <div className="w-1/2">
          <h2 className="font-serif text-2xl text-center">
            {debate?.data.proTeam || "Anonymous Team"}
          </h2>
          <p className="text-zinc-400 text-center">{"AS THE PROPOSITION"}</p>
          <div className="flex flex-row gap-2 justify-center pt-1">
            <div className={`${dot} ${stage > 0 ? dotfill : ""}`} />
            <div className={`${dot} ${stage > 2 ? dotfill : ""}`} />
            <div className={`${dot} ${stage > 4 ? dotfill : ""}`} />
            <div className={`${dot} ${stage > 6 ? dotfill : ""}`} />
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="font-serif text-2xl text-center">
            {debate?.data.oppTeam || "Anonymous Team"}
          </h2>
          <p className="text-zinc-400 text-center">{"AS THE OPPOSITION"}</p>
          <div className="flex flex-row gap-2 justify-center pt-1">
            <div className={`${dot} ${stage > 1 ? dotfill : ""}`} />
            <div className={`${dot} ${stage > 3 ? dotfill : ""}`} />
            <div className={`${dot} ${stage > 5 ? dotfill : ""}`} />
            <div className={`${dot} ${stage > 7 ? dotfill : ""}`} />
          </div>
        </div>
      </div>
      <p className="text-center text-zinc-400">{stageText}</p>
      <div className={stage == 8 ? "hidden" : ""}>
        <div className="max-w-md mx-auto flex flex-row justify-center gap-2 pt-32">
          <button
            className={button}
            onClick={() => {
              if (stage == 8) return;
              if (running) {
                setRunning(false);
                setStage(stage + 1);
              } else {
                setRunning(true);
              }
            }}
          >
            {stageBtnText}
          </button>
          <button className={button} onClick={() => {}}>
            Ad Vocem
          </button>
        </div>
        {/* <div className="max-w-md mx-auto p-1 text-zinc-400">
          <Link href="">
            <button className="hover:underline">Back</button>
          </Link>
        </div> */}
      </div>
      <div
        className={`max-w-lg mx-auto flex flex-row justify-center gap-2 py-6 pt-32 ${
          stage == 8 ? "" : "hidden"
        }`}
      >
        <Link href="/" tabIndex={-1}>
          <button className={button}>Back to menu</button>
        </Link>
        <Link href="/debate/setup" tabIndex={-1}>
          <button className={button}>Back to debate config</button>
        </Link>
      </div>
    </>
  );
}
