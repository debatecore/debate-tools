"use client";
import { DebateClock } from "@/components/DebateClock";
import { AlertCircle } from "@/components/icons/AlertCircle";
import { ArrowLeftCircle } from "@/components/icons/ArrowLeftCircle";
import { PauseCircle } from "@/components/icons/PauseCircle";
import { PlayCircle } from "@/components/icons/PlayCircle";
import { StopCircle } from "@/components/icons/StopCircle";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";

const dot = `
  h-3 w-3 rounded-full border-2 border-zinc-500 z-10
  `;
const dotfill = "bg-zinc-500";
const dotactive = "!border-emerald-400 z-20 animate-ping";
const button = `
  bg-zinc-700 p-2 rounded hover:bg-zinc-600 border border-transparent
  hover:border-zinc-400 disabled:cursor-not-allowed flex flex-row gap-2
  disabled:opacity-50 transition-all
  `;

const dots = (
  speakers: number[],
  showAnim: boolean,
  stage: number
): ReactNode => {
  return (
    <>
      {speakers.map((el) => {
        return (
          <div className="relative" key={`dot${el}`}>
            <div
              className={`${dot} ${stage > el ? dotfill : ""} ${
                showAnim && stage == el ? "!border-emerald-400" : ""
              }`}
            />
            <div
              className={`absolute left-0 top-0 ${dot} ${
                showAnim && stage == el ? dotactive : ""
              }`}
            />
          </div>
        );
      })}
    </>
  );
};

export default function PageDebate() {
  const debate = useContext(DebateContext);

  const [running, setRunning] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [advocem, setAdvocem] = useState<boolean>(false);

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
        <h1 className="text-2xl md:text-4xl">
          {debate?.data.motion || "No motion given."}
        </h1>
        <p className="text-zinc-400">{oxfordDebate}</p>
      </div>
      <div className="relative flex flex-row justify-center py-4">
        <div
          className={`w-1/3 text-right flex flex-col items-end ${
            stage === 8 ? "opacity-80" : ""
          } hidden lg:flex `}
        >
          <h2 className="text-2xl">{debate?.data.proTeam || "Anonymous"}</h2>
          <p className="text-zinc-400">{asPro}</p>
          <div className="flex flex-row gap-1 my-2">
            {dots([0, 2, 4, 6], running && !advocem, stage)}
          </div>
        </div>
        <div
          className={`lg:w-1/3 flex flex-col gap-2 text-center justify-center items-center ${
            stage === 8 ? "opacity-10" : ""
          } `}
        >
          <p className="text-zinc-400">
            {advocem ? "AD VOCEM" : stage != 8 ? stageText : "-"}
          </p>
          <div className="flex flex-row justify-between gap-16 lg:hidden">
            <div className="flex flex-row gap-2">
              {dots([0, 2, 4, 6], running && !advocem, stage)}
            </div>
            <div className="flex flex-row gap-2">
              {dots([1, 3, 5, 7], running && !advocem, stage)}
            </div>
          </div>
          <div className="mt-6">
            <DebateClock running={running} stage={stage} advocem={advocem} />
          </div>
        </div>
        <div
          className={`w-1/3 text-left flex flex-col items-start ${
            stage == 8 ? "opacity-80" : ""
          } hidden lg:flex`}
        >
          <h2 className="text-2xl">{debate?.data.oppTeam || "Anonymous"}</h2>
          <p className="text-zinc-400">{asOpp}</p>
          <div className="flex flex-row gap-1 my-2">
            {dots([1, 3, 5, 7], running && !advocem, stage)}
          </div>
        </div>
        <div
          className={`absolute w-full h-full flex flex-col justify-center items-center ${
            stage !== 8 ? "hidden" : ""
          }`}
        >
          <h1 className="font-bold text-3xl text-daisy-bush-100">{stage8}</h1>
          <div className="text-5xl mt-4 animate-wiggle">{"🎉"}</div>
        </div>
      </div>
      <div className={stage == 8 ? "hidden" : ""}>
        <div className="max-w-lg mx-auto flex flex-row justify-center gap-2 pt-16">
          {stage === 0 && !running ? (
            <Link href="/debate/setup" className={button}>
              <ArrowLeftCircle />
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
            </button>
          )}
          <button
            className={`${button} ${
              advocem ? "!bg-emerald-500 hover:border-white text-white" : ""
            } ${debate?.data.adVocemTime === 0 ? "hidden" : ""}`}
            onClick={() => {
              setAdvocem(!advocem);
            }}
            disabled={running}
          >
            <AlertCircle />
            <p className="hidden sm:block">{"ad vocem"}</p>
          </button>
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
        </div>
      </div>
      <div
        className={`max-w-lg mx-auto flex flex-row justify-center gap-2 py-6 pt-16 ${
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
