"use client";
import { GenericButton } from "@/components/GenericButton";
import { DebateContext } from "@/contexts/DebateContext";
import { useContext, useEffect, useState } from "react";
import { Clock } from "@/components/Clock";
import { useLang } from "@/lib/useLang";
import { LinkButton } from "@/components/LinkButton";
import { IconPlayCircle } from "@/components/icons/PlayCircle";
import { IconStopCircle } from "@/components/icons/StopCircle";
import { IconAlertCircle } from "@/components/icons/AlertCircle";
import { IconArrowLeftCircle } from "@/components/icons/ArrowLeftCircle";
import Link from "next/link";
import { useAudio } from "react-use";

const Dots = (props: {
    stages: number[];
    flashCurrent: boolean;
    stage: number
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
  const [debateEndSoundPlayed, setDebateEndSoundPlayed] = useState(false);

  // prettier-ignore
  const stage_strings = [
    useLang("stage0"), useLang("stage1"), useLang("stage2"), useLang("stage3"),
    useLang("stage4"), useLang("stage5"), useLang("stage6"), useLang("stage7"),
    useLang("stage8")
  ];
  const nomotiongiven = useLang("nomotiongiven");
  const anoxfordformatdebate = useLang("oxfordformatdebate");
  const aspropo = useLang("asproposition");
  const asoppo = useLang("asopposition");
  const startspeech = useLang("startspeech");
  const stopspeech = useLang("stopspeech");
  const debateconfig = useLang("oxfordDebateConfiguration");

  const adVocemSoundPath = useContext(DebateContext).conf.soundPack.adVocemSound;
  const debateEndSoundPath = useContext(DebateContext).conf.soundPack.debateEndSound;

  const [adVocemAudio, stateAdVocemAudio, controlAdVocemAudio] = useAudio({
    src: adVocemSoundPath || "",
  });
  const [debateEndAudio, stateDebateEndAudio, controlDebateEndAudio] = useAudio({
    src: debateEndSoundPath || "",
  });

  useEffect(() => {
    if (stage === 8 && !debateEndSoundPlayed) {
      controlDebateEndAudio.play();
      setDebateEndSoundPlayed(true);
    }
  });

  return (
    <div className="flex flex-col gap-1 text-center mx-auto mt-8">
      <h1 className="font-serif text-4xl text-balance">
        {debate.conf.motion || nomotiongiven}
      </h1>
      <p className="uppercase text-neutral-500">{anoxfordformatdebate}</p>
      <div className="relative flex flex-row justify-center mt-4 py-4">
        {/*  */}
        <div className="hidden lg:flex w-1/3 text-right flex-col items-end">
          <h2 className="text-2xl">
            {debate.conf.proTeam || "Anonymous" || "The Proposition"}
          </h2>
          <p className="text-neutral-500 uppercase">
            {/* {debate.conf.proTeam ? "as the proposition" : "in favour"} */}
            {aspropo}
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
        <div className="w-full lg:w-1/3 text-center flex flex-col space-y-2 items-center">
          <div>
            <p className="text-neutral-500 uppercase">
              {!advocem ? stage_strings[stage] : "ad vocem"}
            </p>
            <div className="flex lg:hidden flex-row space-x-6 justify-center">
              <Dots
                stage={stage}
                stages={[0, 2, 4, 6]}
                flashCurrent={running && !running}
              />
              <Dots
                stage={stage}
                stages={[1, 3, 5, 7]}
                flashCurrent={running && !running}
              />
            </div>
          </div>
          <Clock
            running={running}
            maxtime={advocem ? debate.conf.adVocemTime : debate.conf.speechTime}
            clockimage={debate.conf.displayImage1}
            beepSpeechEnd={debate.conf.beepOnSpeechEnd}
            beepProtected={debate.conf.beepProtectedTime && !advocem}
            protectedTime={debate.conf.endProtectedTime}
            protectStart={!!debate.conf.startProtectedTime}
          />
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="hidden lg:flex w-1/3 text-left flex-col items-start">
          <h2 className="text-2xl">
            {debate.conf.oppTeam || "Anonymous" || "The Opposition"}
          </h2>
          <p className="text-neutral-500 uppercase">
            {/* {debate.conf.oppTeam ? "as the opposition" : "against"} */}
            {asoppo}
          </p>
          <Dots stages={[1, 3, 5, 7]} stage={stage} flashCurrent={running && !advocem} />
        </div>
        {/*  */}
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="max-w-4xl mx-auto flex flex-row gap-2">
        {stage < 8 && (
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row flex-1 space-x-2">
              <GenericButton
                disabled={running || advocem || stage === 0}
                smol
                square
                onClick={() => setStage(stage > 0 ? stage - 1 : stage)}
              >
                <IconArrowLeftCircle />
              </GenericButton>
              <GenericButton
                disabled={running}
                smol
                square
                onClick={() => {
                  if (!advocem) {
                    controlAdVocemAudio.play();
                  }
                  setAdvocem(!advocem);
                }}
                className={advocem ? "!border-emerald-400" : ""}
              >
                <div className="flex flex-row gap-2">
                  <IconAlertCircle />
                  <span className="hidden sm:block">{"ad vocem"}</span>
                </div>
              </GenericButton>
              <GenericButton
                smol
                square
                onClick={() => {
                  setRunning(!running);
                  if (running && !advocem) {
                    setStage(stage + 1);
                  }
                }}
              >
                <div className="flex flex-row gap-2">
                  {!running ? <IconPlayCircle /> : <IconStopCircle />}
                  <span className="hidden sm:block">
                    {!running ? startspeech : stopspeech}
                  </span>
                </div>
              </GenericButton>
            </div>
            <Link
              href="/oxford-debate/setup"
              className="text-neutral-500 hover:underline"
            >
              {debateconfig}
            </Link>
          </div>
        )}
        {stage === 8 && (
          <>
            <GenericButton
              smol
              square
              onClick={() => {
                setStage(stage > 0 ? stage - 1 : stage);
                setDebateEndSoundPlayed(false);
              }}
            >
              <IconArrowLeftCircle />
            </GenericButton>
            <LinkButton square href="/oxford-debate/setup">
              {debateconfig}
            </LinkButton>
          </>
        )}
      </div>
      {adVocemAudio}
      {debateEndAudio}
    </div>
  );
}
