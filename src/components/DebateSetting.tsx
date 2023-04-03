import { useContext, useState } from "react";
import { DebateContext } from "@/pages/_app";
import { debate } from "@/pages/_app";

import { ChevronDown } from "./Icons/ChevronDown";
import { ChevronUp } from "./Icons/ChevronUp";

const debateSettingTitles: { [Property in keyof debate]: string } = {
  motion: "Debate Motion",
  proTeam: "Proposition Team",
  oppTeam: "Opposition Team",
  speechTime: "Speech Time",
};

const DebateSetting = (props: { type: keyof debate }) => {
  const debate = useContext(DebateContext);
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div
      style={{
        background: "#252525",
        minWidth: "220px",
        width: "50%",
        maxWidth: "600px",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          // background: "#363636",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "12px",
          borderRadius: expanded ? "6px 6px 0 0" : "6px",
          cursor: "pointer",
        }}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span>{debateSettingTitles[props.type]}</span>
        <span
          className="mutedtext"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {debate?.data[props.type]}
          {typeof debate?.data[props.type] === typeof 240 ? " seconds" : ""}
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {expanded ? (
        <div>
          <input
            type={
              typeof debate?.data[props.type] === typeof 240 ? "number" : "text"
            }
            value={debate?.data[props.type]}
            onChange={(e) => {
              debate?.setData({
                ...debate?.data,
                [props.type]:
                  typeof debate?.data[props.type] === typeof 240
                    ? parseInt(e.target.value)
                    : e.target.value,
              });
            }}
            style={{
              width: "100%",
              borderRadius: "0 0 6px 6px",
              padding: "8px 12px",
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export { DebateSetting };
