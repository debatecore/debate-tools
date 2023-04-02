import Link from "next/link";
import { useContext } from "react";
import { DebateContext } from "./_app";

import { ConfigString } from "@/components/ConfigString";

export default function Home() {
  const debate = useContext(DebateContext);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
        }}
      >
        <h1>Oxford Debate Tools</h1>
        <p className="mutedtext">An aide to the marshall.</p>
        <p>{debate?.debateContext.motion || ""}</p>
        <p>{debate?.debateContext.proTeam || ""}</p>
        <p>{debate?.debateContext.oppTeam || ""}</p>
        <p>{debate?.debateContext.speechTime.toString() || ""}</p>
        <button
          onClick={() =>
            debate?.setDebateContext({
              motion: debate.debateContext.motion,
              proTeam: debate.debateContext.proTeam,
              oppTeam: debate.debateContext.oppTeam,
              speechTime: debate.debateContext.speechTime + 1,
            })
          }
        >
          add speechtime
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
        }}
      >
        <ConfigString
          title="motion"
          config="thw abolish unsc"
          isExpanded={true}
        />
      </div>
    </>
  );
}
