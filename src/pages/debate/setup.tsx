import { useContext } from "react";
import { DebateContext } from "../_app";
import { defaultDebate } from "../_app";
import { DebateSetting } from "@/components/DebateSetting";
import Link from "next/link";

export default function PageDebateSetup() {
  const debate = useContext(DebateContext);
  return (
    <>
      <div className="centerpadding gap8">
        <DebateSetting setting="motion" />
        <DebateSetting setting="proTeam" />
        <DebateSetting setting="oppTeam" />
        <DebateSetting setting="speechTime" numberIsSeconds />
        <DebateSetting setting="protectedTime" numberIsSeconds />
        <DebateSetting setting="adVocemCount" />
        <DebateSetting setting="adVocemTime" numberIsSeconds />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          maxWidth: "600px",
          margin: "0 auto",
          gap: "12px",
        }}
      >
        <button
          style={{
            fontSize: "20px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid transparent",
          }}
          onClick={() => {
            debate?.setData(defaultDebate);
          }}
        >
          {"reset debate settings"}
        </button>
        <Link href="/debate">
          <button
            style={{
              fontSize: "20px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid transparent",
            }}
          >
            {"conduct the debate"}
          </button>
        </Link>
      </div>
    </>
  );
}
