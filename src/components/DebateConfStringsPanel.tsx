import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { useContext, useRef } from "react";

const inputStyle = `
  border-2 border-neutral-800 bg-transparent rounded
  p-2 px-3 outline-none hover:border-neutral-700 focus:border-neutral-600
  placeholder:text-neutral-700 w-full hover:bg-neutral-800
  hover:placeholder:text-neutral-500
`;

const DebateConfStringsPanel = () => {
  const debateContext = useContext(DebateContext);
  const refMotion = useRef<HTMLInputElement>(null);
  const refProTeam = useRef<HTMLInputElement>(null);
  const refOppTeam = useRef<HTMLInputElement>(null);
  return (
    <>
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
          value={debateContext.conf.motion}
          ref={refMotion}
          onChange={() =>
            debateContext.setConf({
              ...debateContext.conf,
              motion: refMotion.current?.value || "",
            })
          }
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
            value={debateContext.conf.proTeam}
            ref={refProTeam}
            onChange={() =>
              debateContext.setConf({
                ...debateContext.conf,
                proTeam: refProTeam.current?.value || "",
              })
            }
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
            value={debateContext.conf.oppTeam}
            ref={refOppTeam}
            onChange={() =>
              debateContext.setConf({
                ...debateContext.conf,
                oppTeam: refOppTeam.current?.value || "",
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export { DebateConfStringsPanel };
