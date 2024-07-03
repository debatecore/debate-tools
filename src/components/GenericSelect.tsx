import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "./icons/ChevronDown";
import { IconCheck } from "./icons/Check";
import { IconBlankIcon } from "./icons/BlankIcon";

type option = {
  value: string;
  icon?: React.JSX.Element;
  exec?: () => void;
};

type GenericSelectProps = {
  id: string;
  text: string;
  value: string;
  options: option[];
};

const GenericSelect = (props: GenericSelectProps) => {
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const refSelectMenu = useRef<HTMLDivElement>(null);

  const closeSelect = (event: MouseEvent) => {
    // prettier-ignore
    if(refSelectMenu.current && !event.composedPath().includes(refSelectMenu.current)){
      setSelectOpen(false);
    }
  };

  useEffect(() => {
    if (selectOpen) document.body.addEventListener("click", closeSelect);
    return () => document.body.addEventListener("click", closeSelect);
  }, [selectOpen]);

  return (
    <div
      className="flex flex-row justify-between relative"
      id={`${props.id}-container`}
    >
      <p className="text-neutral-500" id={`${props.id}-text`}>
        {props.text}
      </p>
      <button
        className="flex flex-row gap-2 text-neutral-500 select-none items-center"
        id={`${props.id}-selectbutton`}
        onClick={() => setSelectOpen(true)}
      >
        {props.options.find((option) => {
          return option.value === props.value;
        })?.icon || ""}
        {props.value}
        <IconChevronDown moreClass="scale-[.75]" />
      </button>
      {selectOpen ? (
        <div
          ref={refSelectMenu}
          id={`${props.id}-optionscontainer`}
          className={`
            absolute top-0 right-0 flex flex-col z-50
            bg-neutral-800 rounded-md border-2 p-1 gap-1
            border-neutral-700 shadow shadow-black select-none
          `}
        >
          {props.options.map((element: option) => {
            return (
              <button
                key={element.value}
                onClick={() => {
                  if (element.exec) element.exec();
                  setSelectOpen(false);
                }}
                id={`${props.id}-option-${element.value}`}
                className={`
                  flex flex-row gap-1 rounded
                  pr-3 hover:bg-neutral-700 items-center
                `}
              >
                {props.value === element.value ? (
                  <IconCheck moreClass="scale-[.65]" />
                ) : (
                  <IconBlankIcon />
                )}
                {element.icon}
                {element.value}
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export { GenericSelect };
