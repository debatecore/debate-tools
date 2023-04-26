import Link from "next/link";
import { useLang } from "@/lib/useLang";
import { useContext, useState } from "react";
import { OneContext } from "./_app";
import { ChevronDown } from "@/components/Icons/ChevronDown";

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
          <div>
            <ChevronDown />
          </div>
        </button>
        <div className={`langList ${langPanelOn ? "langListVisible" : ""}`}>
          <button
            onClick={() => {
              config?.setLang("en");
            }}
          >
            English
          </button>
          <button
            onClick={() => {
              config?.setLang("pl");
            }}
          >
            Polish
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
