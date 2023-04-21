import { DebateSetting } from "@/components/DebateSetting";
import Link from "next/link";
import { useContext } from "react";
import { DebateContext, defaultDebate } from "./_app";

export default function Home() {
  const debate = useContext(DebateContext);
  return (
    <>
      <div className="centerpadding">
        <h1>{"Debate Tools"}</h1>
        <p className="mutedtext">{"Made with <3 in Poznań."}</p>
        <p className="mutedtext" style={{ opacity: ".4" }}>
          {"debates.manczak.net"}
        </p>
      </div>
      <div
        className="centerpadding"
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link href="/debate/setup">
          <button style={{ padding: "8px 24px", borderRadius: "12px" }}>
            {"Oxford Debate Utility"}
          </button>
        </Link>
        <Link href="/">
          <button
            disabled
            style={{
              padding: "8px 24px",
              borderRadius: "12px",
              opacity: ".4",
              cursor: "not-allowed",
            }}
          >
            {"Tournament Ladder Generator"}
          </button>
        </Link>
      </div>
    </>
  );
}
