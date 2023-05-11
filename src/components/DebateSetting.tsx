"use client";

import { DebateContext, debateType } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { useContext, useState } from "react";

const DebateSetting = (props: { setting: keyof debateType }) => {
  const debate = useContext(DebateContext);
  const [expanded, setExpanded] = useState<boolean>(false);
  const inputstyle = `
		w-full p-2 bg-zinc-700 border border-transparent rounded
		outline-0 hover:bg-zinc-800 hover:border-zinc-400
		focus:bg-zinc-800 focus:border-zinc-400
	`;
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between pb-1">
        <p className="text-zinc-100">{useLang(props.setting)}</p>
        <p className="text-zinc-500">{useLang(`${props.setting}Desc`)}</p>
      </div>
      <input type="text" className={inputstyle} />
    </div>
  );
};
export { DebateSetting };
