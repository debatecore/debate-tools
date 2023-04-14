import { useContext, useState } from "react";
import { DebateContext } from "@/pages/_app";
import { debate } from "@/pages/_app";

import { ChevronDown } from "./Icons/ChevronDown";

const debateSettingTitles: { [Property in keyof debate]?: string } = {
  motion: "Debate Motion",
  proTeam: "Proposition Team",
  oppTeam: "Opposition Team",
  speechTime: "Speech Time",
  protectedTime: "Protected Time",
  adVocemCount: "Ad Vocems per Team",
  adVocemTime: "Ad Vocem Speech Time",
};

const debateSettingDescriptions: { [Property in keyof debate]?: string } = {
  motion: "The matter of debate between the two teams.",
  proTeam: "Name or indicator of the team arguing in favor of the motion.",
  oppTeam: "Name or indicator of the team arguing against the motion.",
  speechTime: "Length of time a regular speaker may speak.",
  protectedTime:
    "A period at the start and end of a speech that can't be interrupted by questions.",
  adVocemCount: "Amount of ad vocems. Set to 0 to allow none.",
  adVocemTime: "Amount of time per ad vocem.",
};

const DebateSetting = (props: {
  setting: keyof debate;
  numberIsSeconds?: boolean;
}) => {
  const debate = useContext(DebateContext);
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div
      style={{
        background: "#252525",
        minWidth: "220px",
        width: "90%",
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
        <span>{debateSettingTitles[props.setting] || props.setting}</span>
        <span
          className="mutedtext"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {debate?.data[props.setting]}
          {props.numberIsSeconds ? ` seconds` : ""}
          <ChevronDown
            className={`chevronFlip ${expanded ? "chevronFlipped" : ""}`}
          />
          {/* {expanded ? <ChevronUp /> : <ChevronDown />} */}
        </span>
      </div>
      {expanded ? (
        <>
          <div className="mutedtext centertext padding8">
            {debateSettingDescriptions[props.setting]}
          </div>
          <div>
            {typeof debate?.data[props.setting] === "number" ||
            typeof debate?.data[props.setting] === "string" ? (
              <input
                type={
                  typeof debate?.data[props.setting] === "number"
                    ? "number"
                    : "text"
                }
                value={
                  typeof debate?.data[props.setting] === "number"
                    ? parseInt(debate.data[props.setting].toString())
                    : debate.data[props.setting].toString()
                }
                onChange={(e) => {
                  debate?.setData({
                    ...debate?.data,
                    [props.setting]:
                      typeof debate?.data[props.setting] === "number"
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
            ) : typeof debate?.data[props.setting] === "boolean" ? (
              "boolean switching soon (?)"
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export { DebateSetting };
