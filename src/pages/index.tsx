import Link from "next/link";
import { useLang } from "@/lib/useLang";
import { useContext, useState } from "react";
import { OneContext } from "./_app";
import { ChevronDown } from "@/components/Icons/ChevronDown";
import { ChevronUp } from "@/components/Icons/ChevronUp";

export default function Home() {
  const config = useContext(OneContext);
  const [langPanelOn, setLangPanelOn] = useState<boolean>(false);
  return (
    <>
      <div className="langParent">
        <button
          onClick={() => {
            setLangPanelOn(!langPanelOn);
          }}
          className={langPanelOn ? "panelOpen" : ""}
        >
          <p>{config?.lang === "pl" ? "Polish" : "English"}</p>
          <div>{!langPanelOn ? <ChevronDown /> : <ChevronUp />}</div>
        </button>
        <div className={`langList ${langPanelOn ? "langListVisible" : ""}`}>
          <button
            onClick={() => {
              config?.setLang("en");
              setLangPanelOn(false);
            }}
          >
            {"English"}
          </button>
          <button
            onClick={() => {
              config?.setLang("pl");
              setLangPanelOn(false);
            }}
          >
            {"Polski"}
          </button>
        </div>
      </div>
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
