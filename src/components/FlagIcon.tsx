import { langsArray, language } from "@/types/language";
import "/node_modules/flag-icons/css/flag-icons.min.css";

type FlagIconProps = {
  lang: language;
};

const FlagIcon = (props: FlagIconProps) => {
  let flagCode = "";
  switch (props.lang) {
    case "en": {
      flagCode = "gb";
      break;
    }
    default: {
      flagCode = props.lang;
    }
  }
  return <span className={"h-[12px] scale-x-[1.15] fi fi-" + flagCode}></span>;
};

export { FlagIcon };
