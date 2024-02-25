import { iconprops } from "@/types/iconprops";

type SharedButtonProps = {
  text: string;
  disabled?: boolean;
  compactOnMobile?: boolean;
  icon?: (props: iconprops) => JSX.Element;
  smol?: boolean;
  square?: boolean;
  onClick?: () => void;
  className?: string;
};
type GenericButtonProps = {
  disableTabbing?: boolean;
};
export type { SharedButtonProps };

const GenericButton = (props: SharedButtonProps & GenericButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      tabIndex={props.disableTabbing ? -1 : 0}
      className={`
        ml-auto p-2 w-full border-2 relative
        ${!props.smol ? "px-12" : ""}
        ${!props.square ? "rounded-lg" : "rounded"}
        overflow-hidden
        border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700
        disabled:opacity-50 disabled:cursor-not-allowed
        ${props.className}
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
