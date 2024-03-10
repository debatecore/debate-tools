"use client";

import { DebateContext } from "@/contexts/DebateContext";
import { useContext, useRef } from "react";
import { GenericButton } from "./GenericButton";
import { IconCheck } from "./icons/Check";
import { IconX } from "./icons/X";

const DebateConfUglyPanel = () => {
  // TODO: rewrite all of this to make it reusable, componentize it,
  // make it not sloppy code etc
  const debateContext = useContext(DebateContext);
  const refSpeechInput = useRef<HTMLInputElement>(null);
  const refAdVocemInput = useRef<HTMLInputElement>(null);
  const refSafeTimeInput = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      {/* SPEECH TIME */}
      {/* <div className="flex justify-between">
        <p>Speech Time</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <GenericButton
          text="4 minutes"
          smol
          square
          className={
            debateContext.conf.speechTime === 240 ? "border-neutral-600" : ""
          }
          onClick={() =>
            debateContext.setConf({ ...debateContext.conf, speechTime: 240 })
          }
        />
        <GenericButton
          text="2 minutes"
          smol
          square
          className={
            debateContext.conf.speechTime === 120 ? "border-neutral-600" : ""
          }
          onClick={() =>
            debateContext.setConf({ ...debateContext.conf, speechTime: 120 })
          }
        />
        <p>or</p>
        <input
          type="number"
          className="p-2 bg-transparent border-2 border-neutral-800 rounded"
          value={debateContext.conf.speechTime}
          ref={refSpeechInput}
          onChange={() =>
            debateContext.setConf({
              ...debateContext.conf,
              speechTime: parseInt(refSpeechInput.current?.value || "240"),
            })
          }
        />
        <p>seconds.</p>
      </div> */}
      {/* PROTECTED TIME */}
      {/* <div className="flex justify-between">
        <p>Protected Time</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <GenericButton
          text="30 seconds"
          smol
          square
          className={
            debateContext.conf.endProtectedTime === 30
              ? "border-neutral-600"
              : ""
          }
          onClick={() =>
            debateContext.setConf({
              ...debateContext.conf,
              endProtectedTime: 30,
              startProtectedTime:
                debateContext.conf.startProtectedTime === 0 ? 0 : 30,
            })
          }
        />
        <GenericButton
          text="20 seconds"
          smol
          square
          className={
            debateContext.conf.endProtectedTime === 20
              ? "border-neutral-600"
              : ""
          }
          onClick={() =>
            debateContext.setConf({
              ...debateContext.conf,
              endProtectedTime: 20,
              startProtectedTime:
                debateContext.conf.startProtectedTime === 0 ? 0 : 20,
            })
          }
        />
        <p>or</p>
        <input
          type="number"
          className="p-2 bg-transparent border-2 border-neutral-800 rounded"
          value={debateContext.conf.endProtectedTime}
          ref={refSafeTimeInput}
          onChange={() =>
            debateContext.setConf({
              ...debateContext.conf,
              endProtectedTime: parseInt(
                refSafeTimeInput.current?.value || "30"
              ),
              startProtectedTime:
                debateContext.conf.startProtectedTime === 0
                  ? 0
                  : parseInt(refSafeTimeInput.current?.value || "30"),
            })
          }
        />
        <p>seconds.</p>
      </div> */}
      {/* AD VOCEM TIME */}
      {/* <div className="flex justify-between">
        <p>Ad Vocem</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <GenericButton
          text="1 minute"
          smol
          square
          className={
            debateContext.conf.adVocemTime === 60 ? "border-neutral-600" : ""
          }
          onClick={() =>
            debateContext.setConf({ ...debateContext.conf, adVocemTime: 60 })
          }
        />
        <GenericButton
          text="Off"
          smol
          square
          className={
            debateContext.conf.adVocemTime === 0 ? "border-neutral-600" : ""
          }
          onClick={() =>
            debateContext.setConf({ ...debateContext.conf, adVocemTime: 0 })
          }
        />
        <p>or</p>
        <input
          type="number"
          className="p-2 bg-transparent border-2 border-neutral-800 rounded"
          value={debateContext.conf.adVocemTime}
          ref={refAdVocemInput}
          onChange={() =>
            debateContext.setConf({
              ...debateContext.conf,
              adVocemTime: parseInt(refAdVocemInput.current?.value || "60"),
            })
          }
        />
        <p>seconds.</p>
      </div> */}
      <div className="flex flex-row gap-2 mt-4">
        <GenericButton
          text="Beep on speech time"
          icon={debateContext.conf.beepOnSpeechEnd ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              beepOnSpeechEnd: !debateContext.conf.beepOnSpeechEnd,
            });
          }}
        />
        <GenericButton
          text="Beep on protected time"
          icon={debateContext.conf.beepProtectedTime ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              beepProtectedTime: !debateContext.conf.beepProtectedTime,
            });
          }}
        />
      </div>
      <div className="flex flex-row gap-2">
        <GenericButton
          text="Visualize protected times"
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
          text="Protect time on speech start"
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
      </div>
    </div>
  );
};

export { DebateConfUglyPanel };
