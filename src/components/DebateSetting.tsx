import { useContext, useState } from "react";
import { OneContext } from "@/pages/_app";
import { debate } from "@/pages/_app";

import { ChevronDown } from "./Icons/ChevronDown";

const debateSettingTitles: { [Property in keyof debate]?: string } = {
  motion: "Debate Motion",
  proTeam: "Proposition Team",
  oppTeam: "Opposition Team",
  speechTime: "Speech Time",
  protectedTime: "Protected Time",
};

const debateSettingDescriptions: { [Property in keyof debate]?: string } = {
  motion: "The matter of debate between the two teams.",
  proTeam: "Name or indicator of the team arguing in favor of the motion.",
  oppTeam: "Name or indicator of the team arguing against the motion.",
  speechTime: "Length of time a regular speaker may speak.",
  protectedTime:
    "A period at the start and end of a speech that can't be interrupted by questions.",
};

const DebateSetting = (props: {
  setting: keyof debate;
  numberIsSeconds?: boolean;
}) => {
  const config = useContext(OneContext);
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
          {config?.debate[props.setting]}
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
            {typeof config?.debate[props.setting] === "number" ||
            typeof config?.debate[props.setting] === "string" ? (
              <input
                type={
                  typeof config?.debate[props.setting] === "number"
                    ? "number"
                    : "text"
                }
                value={
                  typeof config?.debate[props.setting] === "number"
                    ? parseInt(config.debate[props.setting].toString())
                    : config.debate[props.setting].toString()
                }
                onChange={(e) => {
                  config?.setDebate({
                    ...config?.debate,
                    [props.setting]:
                      typeof config?.debate[props.setting] === "number"
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
            ) : typeof config?.debate[props.setting] === "boolean" ? (
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
