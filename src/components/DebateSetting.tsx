"use client";
import { DebateContext, debateType } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { useContext, useState } from "react";

const DebateSetting = (props: {
  setting: keyof debateType;
  isSeconds?: boolean;
}) => {
  const debate = useContext(DebateContext);
  const inputstyle = `
		w-full p-2 bg-zinc-700 border border-transparent rounded
		outline-0 hover:bg-zinc-800 hover:border-zinc-400
		focus:bg-zinc-800 focus:border-zinc-400
	`;
  const string = useLang(props.setting);
  const stringdesc = useLang(`${props.setting}Desc`);
  const inputType = typeof debate?.data[props.setting];
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between pb-1">
        <p className="text-zinc-100">{string}</p>
        <p className="text-zinc-500">{stringdesc}</p>
      </div>
      {inputType === "string" ? (
        <input
          type="text"
          className={inputstyle}
          value={debate?.data[props.setting]}
          placeholder={string}
          onChange={(e) => {
            debate?.setData({
              ...debate.data,
              [props.setting]: e.target.value,
            });
          }}
        />
      ) : inputType === "number" ? (
        <input
          type="number"
          min={1}
          className={inputstyle}
          value={debate?.data[props.setting]}
          onChange={(e) => {
            debate?.setData({
              ...debate.data,
              [props.setting]: parseInt(e.target.value),
            });
          }}
        />
      ) : (
        "unsupported input."
      )}
    </div>
  );
};
export { DebateSetting };
