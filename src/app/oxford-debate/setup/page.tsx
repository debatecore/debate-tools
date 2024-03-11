"use client";
import { DebateConfStringsPanel } from "@/components/DebateConfStringsPanel";
import { GenericButton } from "@/components/GenericButton";
import { LinkButton } from "@/components/LinkButton";
import { TimeInput } from "@/components/TimeInput";
import { IconCheck } from "@/components/icons/Check";
import { IconList } from "@/components/icons/List";
import { IconPlayCircle } from "@/components/icons/PlayCircle";
import { IconX } from "@/components/icons/X";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { useContext } from "react";

export default function OxfordDebateSetup() {
  const debateContext = useContext(DebateContext);
  const flavortext = useLang("oxfordDebateConfigurationFlavortext");
  return (
    <div>
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("oxfordDebateConfiguration")}
      </h1>
      <p className="text-center text-neutral-500">
        {debateContext.conf.motion || flavortext}
      </p>
      <div className="max-w-2xl mx-auto mt-8 flex flex-col gap-4 px-4">
        <DebateConfStringsPanel />
        <hr className="border-b-2 rounded border-neutral-800 my-2" />
        <div className="flex flex-row justify-between items-center">
          <p>{useLang("speechTime")}</p>
          <TimeInput
            time={debateContext.conf.speechTime}
            setTime={(time: number) => {
              debateContext.setConf({
                ...debateContext.conf,
                speechTime: time,
              });
            }}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>{useLang("protectedTime")}</p>
          <TimeInput
            time={debateContext.conf.endProtectedTime}
            setTime={(time: number) => {
              debateContext.setConf({
                ...debateContext.conf,
                endProtectedTime: time,
              });
            }}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>{useLang("adVocemTime")}</p>
          <TimeInput
            time={debateContext.conf.adVocemTime}
            setTime={(time: number) => {
              debateContext.setConf({
                ...debateContext.conf,
                adVocemTime: time,
              });
            }}
          />
        </div>
        <GenericButton
          text={useLang("beepOnSpeechEnd")}
          icon={debateContext.conf.beepOnSpeechEnd ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              beepOnSpeechEnd: !debateContext.conf.beepOnSpeechEnd,
            });
          }}
        />
        <GenericButton
          text={useLang("beepOnProtected")}
          icon={debateContext.conf.beepProtectedTime ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              beepProtectedTime: !debateContext.conf.beepProtectedTime,
            });
          }}
        />
        <GenericButton
          text={useLang("visualizeProtected")}
          icon={debateContext.conf.visualizeProtectedTimes ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              visualizeProtectedTimes:
                !debateContext.conf.visualizeProtectedTimes,
            });
          }}
        />
        <GenericButton
          text={useLang("protectSpeechStart")}
          icon={debateContext.conf.startProtectedTime ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              startProtectedTime:
                debateContext.conf.startProtectedTime === 0
                  ? debateContext.conf.endProtectedTime
                  : 0,
            });
          }}
        />
        <hr className="border-b-2 rounded border-neutral-800 my-2" />
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <LinkButton href="/" text={useLang("mainmenu")} icon={IconList} />
          <LinkButton
            href="/"
            text={useLang("oxfordDebateConductionUtility")}
            icon={IconPlayCircle}
          />
        </div>
      </div>
    </div>
  );
}
