import Link from "next/link";
import { GenericButton, SharedButtonProps } from "./GenericButton";

type LinkButtonProps = {
  href: string;
} & SharedButtonProps;
export type { LinkButtonProps };

const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link
      href={props.disabled ? "/" : props.href}
      className="rounded-lg"
      tabIndex={props.disabled ? -1 : 0}
    >
      <GenericButton
        text={props.text}
        disableTabbing
        disabled={props.disabled}
        icon={props.icon}
        compactOnMobile={props.compactOnMobile}
      />
    </Link>
  );
};

export { LinkButton };
