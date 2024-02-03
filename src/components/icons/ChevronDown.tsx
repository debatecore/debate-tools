import { iconprops } from "@/types/iconprops";

const IconChevronDown = (props: iconprops) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={props.fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-chevron-down ${props.moreClass}`}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export { IconChevronDown };
