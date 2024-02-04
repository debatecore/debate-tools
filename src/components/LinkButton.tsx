import { iconprops } from "@/types/iconprops";
import Link from "next/link";

type LinkButtonProps = {
  text: string;
  href: string;
  disabled?: boolean;
  compactOnMobile?: boolean;
  icon?: (props: iconprops) => JSX.Element;
};
export type { LinkButtonProps };

const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link
      href={props.disabled ? "/" : props.href}
      className="rounded-lg"
      tabIndex={props.disabled ? -1 : 0}
    >
      <button
        disabled={props.disabled}
        tabIndex={-1}
        className={`
          ml-auto p-2 px-12 rounded-lg w-full border-2 relative overflow-hidden
          border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <span className="z-20">{props.text}</span>
        {props.icon
          ? props.icon({
              moreClass:
                "absolute bottom-1 right-0 scale-[1.75] rotate-[-15deg] opacity-[.15] text-white z-10",
            })
          : ""}
      </button>
    </Link>
  );
};

export { LinkButton };
