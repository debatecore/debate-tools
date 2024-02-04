"use client";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { useContext } from "react";

const inputStyle = `
  border-2 border-neutral-800 bg-transparent rounded
  p-2 px-3 outline-none hover:border-neutral-700 focus:border-neutral-600
  placeholder:text-neutral-700 w-full
`;

export default function OxfordDebateSetup() {
  const debateContext = useContext(DebateContext);
  return (
    <div>
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("oxfordDebateConfiguration")}
      </h1>
      <p className="text-center text-neutral-500">
        {useLang("oxfordDebateConfigurationFlavortext")}
      </p>
      <div className="max-w-2xl mx-auto mt-8 flex flex-col gap-4 px-4">
        <div className="w-full">
          <div className="flex flex-row justify-between">
            <p>{useLang("debateMotion")}</p>
            <p className="text-neutral-500">
              {useLang("debateMotionFlavortext")}
            </p>
          </div>
          <input
            type="text"
            placeholder={useLang("debateMotion")}
            className={inputStyle}
          />
        </div>
        <div className="flex flex-row justify-between gap-4 flex-wrap md:flex-nowrap">
          <div className="flex flex-col min-w-[48%] w-full">
            <div className="flex flex-row justify-between">
              <p>{useLang("proTeam")}</p>
              <p className="text-neutral-500">{useLang("proTeamFlavortext")}</p>
            </div>
            <input
              type="text"
              placeholder={useLang("proTeam")}
              className={inputStyle}
            />
          </div>
          <div className="flex flex-col min-w-[48%] w-full">
            <div className="flex flex-row justify-between">
              <p>{useLang("oppTeam")}</p>
              <p className="text-neutral-500">{useLang("oppTeamFlavortext")}</p>
            </div>
            <input
              type="text"
              placeholder={useLang("oppTeam")}
              className={inputStyle}
            />
          </div>
        </div>
        {/* 
        
        
        */}
        <p>{debateContext.conf.speechTime}</p>
        <p>{debateContext.conf.adVocemTime}</p>
        <p>{debateContext.conf.endProtectedTime}</p>
        <p>{debateContext.conf.startProtectedTime}</p>
        <p>{debateContext.conf.beepOnSpeechEnd ? "y" : "n"}</p>
        <p>{debateContext.conf.beepProtectedTime ? "y" : "n"}</p>
        <p>{debateContext.conf.visualizeProtectedTimes ? "y" : "n"}</p>
      </div>
    </div>
  );
}
