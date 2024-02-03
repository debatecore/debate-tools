import { iconprops } from "@/types/iconprops";

const IconCheck = (props: iconprops) => {
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
      className={`feather feather-check ${props.moreClass}`}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};

export { IconCheck };
