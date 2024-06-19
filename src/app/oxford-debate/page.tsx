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
  highlightNext: boolean;
  stage: number;
}) => {
  const dotStageStyling = (dotPosition: number) => {
    if (props.stage > dotPosition) {
      return "bg-neutral-600 border-neutral-600";
    } else if (props.stage === dotPosition) {
      if (props.flashCurrent) {
        return "border-emerald-400";
      }
      return "border-slate-300";
    } else {
      return "border-neutral-600";
    }
  };
  return (
    <div className="flex flex-row gap-1 mt-1">
      {props.stages.map((el) => {
        return (
          <div className="relative" key={`dot${el}`}>
            {props.stage === el && props.flashCurrent && (
              <div className="absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-emerald-400 animate-ping z-20" />
            )}
            <div
              className={`h-3 w-3 rounded-full border-2 z-10
                ${dotStageStyling(el)}`}
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
  const [adVocem, setAdvocem] = useState<boolean>(false);
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

  const conf = useContext(DebateContext).conf;

  const advocemSound = ((temp) => ({
    element: temp[0],
    state: temp[1],
    controls: temp[2],
  }))(useAudio({ src: conf.soundPack.adVocemSound || "" }));

  const debateEndSound = ((temp) => ({
    element: temp[0],
    state: temp[1],
    controls: temp[2],
  }))(useAudio({ src: conf.soundPack.debateEndSound || "" }));

  const fullvolume = 1; // useAudio volume range is 0-1

  useEffect(() => {
    advocemSound.controls.volume(conf.soundPack.volumeOverride || fullvolume);
    debateEndSound.controls.volume(conf.soundPack.volumeOverride || fullvolume);
    if (stage === 8 && !debateEndSoundPlayed) {
      debateEndSound.controls.play();
      setDebateEndSoundPlayed(true);
    }
  }, [stage]);

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
          <p className="text-neutral-500 uppercase">{aspropo}</p>
          <Dots
            stages={[0, 2, 4, 6]}
            stage={stage}
            flashCurrent={running && !adVocem}
            highlightNext={!running && !adVocem}
          />
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="w-full lg:w-1/3 text-center flex flex-col space-y-2 items-center">
          <div>
            <p className="text-neutral-500 uppercase">
              {!adVocem ? stage_strings[stage] : "ad vocem"}
            </p>
            <div className="flex lg:hidden flex-row space-x-6 justify-center">
              <Dots
                stage={stage}
                stages={[0, 2, 4, 6]}
                flashCurrent={running && !running}
                highlightNext={!running && !adVocem}
              />
              <Dots
                stage={stage}
                stages={[1, 3, 5, 7]}
                flashCurrent={running && !running}
                highlightNext={!running && !adVocem}
              />
            </div>
          </div>
          <Clock
            running={running}
            maxTime={adVocem ? debate.conf.adVocemTime : debate.conf.speechTime}
            clockImage={debate.conf.clockImageName}
            beepSpeechEnd={debate.conf.beepOnSpeechEnd}
            beepProtected={debate.conf.beepProtectedTime && !adVocem}
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
          <Dots
            stages={[1, 3, 5, 7]}
            stage={stage}
            flashCurrent={running && !adVocem}
            highlightNext={!running && !adVocem}
          />
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
                disabled={running || adVocem || stage === 0}
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
                  if (!adVocem) {
                    advocemSound.controls.play();
                  }
                  setAdvocem(!adVocem);
                }}
                className={adVocem ? "!border-emerald-400" : ""}
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
                  if (running && !adVocem) {
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
      {advocemSound.element}
      {debateEndSound.element}
    </div>
  );
}
