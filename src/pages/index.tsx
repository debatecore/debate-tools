import Link from "next/link";
import { useLang } from "@/lib/useLang";

export default function Home() {
  return (
    <>
      <div className="centerpadding">
        <h1
          style={{
            fontSize: "36px",
          }}
        >
          {useLang("SITE_TITLE")}
        </h1>
        <p className="mutedtext">{useLang("MADE_WITH")}</p>
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
          <button>{useLang("DEBATE_TOOL")}</button>
        </Link>
        <Link href="/">
          <button
            disabled
            style={{
              opacity: ".4",
              cursor: "not-allowed",
            }}
          >
            {useLang("LADDER_TOOL")}
          </button>
        </Link>
      </div>
    </>
  );
}
