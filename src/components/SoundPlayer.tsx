import { iconprops } from "@/types/iconprops";
// @ts-ignore because joshwcomeau doesn't maintain lib
import useSound from "use-sound";

type soundPlayerButtonType = {
  text: string;
  soundpath: string;
  lefticon?: (props: iconprops) => JSX.Element;
  lefticonclasses?: string;
  righticon?: (props: iconprops) => JSX.Element;
  righticonclasses?: string;
};
export type { soundPlayerButtonType };

const SoundPlayerButton = (props: soundPlayerButtonType) => {
  const [playSound] = useSound(props.soundpath);
  return (
    <button
      onClick={() => playSound()}
      className="relative p-4 w-1/3 rounded border-2 border-neutral-800 bg-neutral-800 hover:border-neutral-700 overflow-hidden active:border-neutral-500"
    >
      <span className="z-20 relative">{props.text}</span>
      {props.righticon
        ? props.righticon({
            moreClass: `absolute z-10 rotate-[-30deg] top-1 right-3 text-neutral-700 scale-[3] ${props.righticonclasses}`,
          })
        : ""}
      {props.lefticon
        ? props.lefticon({
            moreClass: `absolute z-10 rotate-[0deg] bottom-1 left-1 text-neutral-700 scale-[2.5] ${props.lefticonclasses}`,
            // "absolute rotate-[0deg] bottom-4 left-4 text-neutral-700 scale-[2]",
          })
        : ""}
    </button>
  );
};
export { SoundPlayerButton };
