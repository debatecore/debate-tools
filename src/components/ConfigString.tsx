import { useEffect, useState } from "react";
import { ChevronDown } from "./Icons/ChevronDown";
import { ChevronUp } from "./Icons/ChevronUp";

const ConfigString = (props: {
  title: string;
  config: string;
  isExpanded: boolean;
}) => {
  const [title, setTitle] = useState(props.title);
  const [config, setConfig] = useState(props.config);
  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    setConfig(props.config);
  }, [props.config]);
  return (
    <div
      style={{
        background: "#252525",
        minWidth: "220px",
        width: "50%",
        maxWidth: "450px",
        padding: "12px",
        cursor: "pointer",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span>{title}</span>
        <span className="mutedtext">{config}</span>
        {props.isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div></div>
    </div>
  );
};

export { ConfigString };
