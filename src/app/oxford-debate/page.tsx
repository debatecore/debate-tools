"use client";
import { GenericButton } from "@/components/GenericButton";
import { DebateContext } from "@/contexts/DebateContext";
import { useContext, useState } from "react";
import { Clock } from "@/components/Clock";
import Image from "next/image";

const Dots = (props: {
  stages: number[];
  flashCurrent: boolean;
  stage: number;
}) => {
  return (
    <div className="flex flex-row gap-1 mt-1">
      {props.stages.map((el) => {
        return (
          <div className="relative" key={`dot${el}`}>
            {props.stage === el && props.flashCurrent && (
              <div className="absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-emerald-400 animate-ping z-20" />
            )}
            <div
              className={`h-3 w-3 rounded-full border-2 z-10 ${
                props.stage > el && "bg-neutral-600"
              } ${
                props.stage === el && props.flashCurrent
                  ? "border-emerald-400"
                  : "border-neutral-600"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default function OxfordDebate() {
  const debate = useContext(DebateContext);
  const [stage, setStage] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [advocem, setAdvocem] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1 text-center mx-auto mt-8">
      <h1 className="font-serif text-4xl text-balance">
        {debate.conf.motion || "No motion given"}
      </h1>
      <p className="uppercase text-neutral-500">{"an oxford format debate"}</p>
      <div className="relative flex flex-row justify-center py-4">
        {/*  */}
        <div className="w-1/3 text-right flex flex-col items-end">
          <h2 className="text-2xl">
            {debate.conf.proTeam || "The Proposition"}
          </h2>
          <p className="text-neutral-500 uppercase">
            {debate.conf.proTeam ? "as the proposition" : "in favour"}
          </p>
          <Dots
            stages={[0, 2, 4, 6]}
            stage={stage}
            flashCurrent={running && !advocem}
          />
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="w-1/3 text-center flex flex-col space-y-2 items-center">
          <p className="text-neutral-500 uppercase">
            {"current debate stage here"}
          </p>
          <Clock
            running={running}
            maxtime={advocem ? debate.conf.adVocemTime : debate.conf.speechTime}
            clockimage={debate.conf.displayImage1}
          />
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="w-1/3 text-left flex flex-col items-start">
          <h2 className="text-2xl">
            {debate.conf.oppTeam || "The Opposition"}
          </h2>
          <p className="text-neutral-500 uppercase">
            {debate.conf.oppTeam ? "as the opposition" : "against"}
          </p>
          <Dots
            stages={[1, 3, 5, 7]}
            stage={stage}
            flashCurrent={running && !advocem}
          />
        </div>
        {/*  */}
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="max-w-4xl mx-auto flex flex-row space-x-2">
        {stage < 8 && (
          <>
            <GenericButton
              text={!running ? "run" : "stop"}
              onClick={() => {
                setRunning(!running);
                if (running && !advocem) {
                  setStage(stage + 1);
                }
              }}
            />
            <GenericButton
              text="advocem"
              disabled={running}
              onClick={() => setAdvocem(!advocem)}
            />
          </>
        )}
      </div>
    </div>
  );
}
