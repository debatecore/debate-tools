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
      <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" />
      <path d="M20 8C20 6.4087 19.3679 4.88258 18.2426 3.75736C17.1174 2.63214 15.5913 2 14 2C12.4087 2 10.8826 2.63214 9.75736 3.75736C8.63214 4.88258 8 6.4087 8 8C8 15 5 17 5 17H23C23 17 20 15 20 8Z" />
      <path d="M11 0C9.4087 0 7.88258 0.632141 6.75736 1.75736C5.63214 2.88258 5 4.4087 5 6C5 13 2 15 2 15" />
    </svg>
  );
};

export { IconDoubleBell };
