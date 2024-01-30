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
      <path
        id="svg_1"
        d="m17.71875,8.3125a6,6 0 0 0 -12,0c0,7 -3,9 -3,9l18,0s-3,-2 -3,-9"
      />
      <path id="svg_2" d="m13.73,21a2,2 0 0 1 -3.46,0" />
      <path
        stroke="null"
        id="svg_3"
        d="m14.50521,9.36936a2.80209,3.02459 0 0 0 -5.60418,0c0,3.52869 -1.40104,4.53689 -1.40104,4.53689l8.40626,0s-1.40104,-1.0082 -1.40104,-4.53689"
      />
    </svg>
  );
};

export { IconDoubleBell };
