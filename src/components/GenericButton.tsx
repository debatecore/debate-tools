import { iconprops } from "@/types/iconprops";
import { MouseEventHandler, useEffect } from "react";

type GenericButtonProps = {
  text: string;
  disabled?: boolean;
  compactOnMobile?: boolean;
  icon?: (props: iconprops) => JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export type { GenericButtonProps };

const GenericButton = (props: GenericButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      tabIndex={-1}
      className={`
        ml-auto p-2 px-12 rounded-lg w-full border-2 relative overflow-hidden
        border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700
        disabled:opacity-50 disabled:cursor-not-allowed
        `}
      onClick={props.onClick}
    >
      <span className="z-20">{props.text}</span>
      {props.icon
        ? props.icon({
            moreClass:
              "absolute bottom-1 right-0 scale-[1.75] rotate-[-15deg] opacity-[.15] text-white z-10",
          })
        : ""}
    </button>
  );
};

export { GenericButton };
