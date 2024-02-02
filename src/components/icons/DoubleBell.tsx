import { iconprops } from "@/types/iconprops";

const IconDoubleBell = (props: iconprops) => {
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
      className={`feather feather-bell ${props.moreClass}`}
    >
      <path d="M18.45,10.39c0-3.31-2.69-6-6-6s-6,2.69-6,6c0,7-3,9-3,9h18s-3-2-3-9" />
      <path d="M15.71,5.16c-.04-.13-.09-.26-.14-.39-.88-2.21-3.05-3.78-5.58-3.78-3.31,0-6,2.69-6,6,0,7-3,9-3,9h4.62" />
      <path d="M13.73 22a2 2 0 0 1-3.46 0"></path>
    </svg>
  );
};

export { IconDoubleBell };
