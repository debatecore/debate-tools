import { iconprops } from "@/types/iconprops";
// @ts-ignore because joshwcomeau doesn't maintain lib
import useSound from "use-sound";

type soundPlayerButtonType = {
  text: string;
  soundpath: string;
  lefticon?: (props: iconprops) => JSX.Element;
  righticon?: (props: iconprops) => JSX.Element;
};
export type { soundPlayerButtonType };

const SoundPlayerButton = (props: soundPlayerButtonType) => {
  const [playSound] = useSound(props.soundpath);
  return (
    <button
      onClick={() => playSound()}
      className="relative p-4 w-1/3 rounded border-2 border-neutral-800 bg-neutral-800 hover:border-neutral-700 overflow-hidden"
    >
      {props.text}
      {props.righticon
        ? props.righticon({
            moreClass:
              "absolute rotate-[-30deg] top-1 right-3 text-neutral-700 scale-[3]",
          })
        : ""}
      {props.lefticon
        ? props.lefticon({
            moreClass:
              "absolute rotate-[0deg] bottom-1 left-1 text-neutral-700 scale-[2.5]",
            // "absolute rotate-[0deg] bottom-4 left-4 text-neutral-700 scale-[2]",
          })
        : ""}
    </button>
  );
};
export { SoundPlayerButton };
