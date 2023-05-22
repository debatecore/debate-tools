"use client";
import { DebateClock } from "@/components/DebateClock";
import { AlertCircle } from "@/components/icons/AlertCircle";
import { AlertTriangle } from "@/components/icons/AlertTriangle";
import { ArrowLeftCircle } from "@/components/icons/ArrowLeftCircle";
import { PauseCircle } from "@/components/icons/PauseCircle";
import { PlayCircle } from "@/components/icons/PlayCircle";
import { RotateCCW } from "@/components/icons/RotateCCW";
import { StopCircle } from "@/components/icons/StopCircle";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useContext, useState } from "react";

export default function PageDebate() {
  const debate = useContext(DebateContext);

  const [running, setRunning] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [advocem, setAdvocem] = useState<boolean>(false);

  const dot = `
    h-3 w-3 rounded-full border-2 border-zinc-500
  `;
  const dotfill = "bg-zinc-500";
  const dotactive = "border-zinc-400";
  const button = `
    bg-zinc-700 p-2 rounded hover:bg-zinc-600 border border-transparent
    hover:border-zinc-400 disabled:cursor-not-allowed flex flex-row gap-2
    disabled:opacity-50 transition-all
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
      : "STAGE_7"
  );
  const stage8 = useLang("STAGE_8");
  const back = useLang("back");
  const nukedebate = useLang("nukedebate");
  const speechstart = useLang("speechstart");
  const speechend = useLang("speechend");

  const oxfordDebate = useLang("oxfordDebate");
  const asPro = useLang("asPro");
  const asOpp = useLang("asOpp");

  return (
    <>
      <div className="text-center py-8 pt-16">
        <h1 className="font-serif text-4xl">
          {debate?.data.motion || "No motion given."}
        </h1>
        <p className="text-zinc-400">{oxfordDebate}</p>
      </div>
      <div className={`flex flex-row py-4 ${stage === 8 ? "opacity-50" : ""}`}>
        <div className="w-1/2">
          <h2 className="font-serif text-2xl text-center">
            {debate?.data.proTeam || "Anonymous Team"}
          </h2>
          <p className="text-zinc-400 text-center">{asPro}</p>
          <div className="flex flex-row gap-2 justify-center pt-1">
            <div
              className={`
                ${dot}
                ${stage > 0 ? dotfill : ""}
                ${stage === 0 ? dotactive : ""}
              `}
            />
            <div
              className={`
                ${dot}
                ${stage > 2 ? dotfill : ""}
                ${stage === 2 ? dotactive : ""}
              `}
            />
            <div
              className={`
                ${dot}
                ${stage > 4 ? dotfill : ""}
                ${stage === 4 ? dotactive : ""}
              `}
            />
            <div
              className={`
                ${dot}
                ${stage > 6 ? dotfill : ""}
                ${stage === 6 ? dotactive : ""}
              `}
            />
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="font-serif text-2xl text-center">
            {debate?.data.oppTeam || "Anonymous Team"}
          </h2>
          <p className="text-zinc-400 text-center">{asOpp}</p>
          <div className="flex flex-row gap-2 justify-center pt-1">
            <div
              className={`
                ${dot}
                ${stage > 1 ? dotfill : ""}
                ${stage === 1 ? dotactive : ""}
              `}
            />
            <div
              className={`
                ${dot}
                ${stage > 3 ? dotfill : ""}
                ${stage === 3 ? dotactive : ""}
              `}
            />
            <div
              className={`
                ${dot}
                ${stage > 5 ? dotfill : ""}
                ${stage === 5 ? dotactive : ""}
              `}
            />
            <div
              className={`
                ${dot}
                ${stage > 7 ? dotfill : ""}
                ${stage === 7 ? dotactive : ""}
              `}
            />
          </div>
        </div>
      </div>
      <p className="text-center text-zinc-400">
        {stage != 8 ? stageText : "-"}
      </p>
      <div className="relative flex flex-row py-4">
        <div className="w-1/2 flex flex-row justify-center">
          <DebateClock
            running={running && [0, 2, 4, 6].includes(stage)}
            dimmed={(running && [1, 3, 5, 7].includes(stage)) || stage === 8}
            advocem={advocem}
            stage={stage}
          />
        </div>
        <div className="w-1/2 flex flex-row justify-center">
          <DebateClock
            running={running && [1, 3, 5, 7].includes(stage)}
            dimmed={(running && [0, 2, 4, 6].includes(stage)) || stage === 8}
            advocem={advocem}
            stage={stage}
          />
        </div>
        <div
          className={`absolute w-full h-full ${stage === 8 ? "" : "hidden"}`}
        >
          <div className="flex flex-col w-full h-full justify-center items-center">
            <h1 className="font-bold text-3xl text-daisy-bush-100">{stage8}</h1>
            <div className="text-5xl mt-4 animate-wiggle">{"🎉"}</div>
          </div>
        </div>
      </div>
      <div className={stage == 8 ? "hidden" : ""}>
        <div className="max-w-lg mx-auto flex flex-row justify-center gap-2 pt-32">
          {stage === 0 ? (
            <Link href="/debate/setup" className={button}>
              <ArrowLeftCircle />
              <p className="hidden sm:block">{back}</p>
            </Link>
          ) : (
            <button
              className={button}
              onClick={() => {
                setRunning(false);
                setAdvocem(false);
                setStage(0);
              }}
            >
              <StopCircle />
              <p className="hidden sm:block">{nukedebate}</p>
            </button>
          )}
          <button
            className={button}
            onClick={() => {
              if (stage == 8) return;
              if (running) {
                setRunning(false);
                setStage(advocem ? stage : stage + 1);
              } else {
                setRunning(true);
              }
            }}
          >
            {running ? <PauseCircle /> : <PlayCircle />}
            <p className="hidden sm:block">
              {running ? speechend : speechstart}
            </p>
          </button>
          <button
            className={`${button} ${
              advocem ? "!bg-emerald-400 hover:border-white text-white" : ""
            }`}
            onClick={() => {
              setAdvocem(!advocem);
            }}
            disabled={running}
          >
            <AlertCircle />
            <p className="hidden sm:block">{"ad vocem"}</p>
          </button>
        </div>
      </div>
      <div
        className={`max-w-lg mx-auto flex flex-row justify-center gap-2 py-6 pt-32 ${
          stage == 8 ? "" : "hidden"
        }`}
      >
        <Link href="/" className={button}>
          <ArrowLeftCircle />
          <p className="hidden sm:block">{back}</p>
        </Link>
        <button
          className={button}
          onClick={() => {
            setRunning(false);
            setAdvocem(false);
            setStage(0);
          }}
        >
          <StopCircle />
          <p className="hidden sm:block">{nukedebate}</p>
        </button>
      </div>
    </>
  );
}
