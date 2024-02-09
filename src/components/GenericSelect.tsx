import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "./icons/ChevronDown";
import { IconCheck } from "./icons/Check";
import { IconBlankIcon } from "./icons/BlankIcon";

type option = {
  value: string;
  exec?: () => void;
};

type GenericSelectProps = {
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
    <div className="flex flex-row justify-between relative">
      <p className="text-neutral-500">{props.text}</p>
      <button
        className="flex flex-row gap-2 text-neutral-500 select-none"
        onClick={() => setSelectOpen(true)}
      >
        {props.value}
        <IconChevronDown moreClass="scale-[.75]" />
      </button>
      {selectOpen ? (
        <div
          ref={refSelectMenu}
          className={`
            absolute top-0 right-0 flex flex-col z-50
            bg-neutral-800 rounded-md border-2 p-1 gap-1
            border-neutral-700 shadow shadow-black select-none
          `}
        >
          {props.options.map((el: option) => {
            return (
              <button
                key={el.value}
                onClick={() => {
                  if (el.exec) el.exec();
                  setSelectOpen(false);
                }}
                className={`
                  flex flex-row gap-1 rounded
                  pr-3 hover:bg-neutral-700
                `}
              >
                {props.value === el.value ? (
                  <IconCheck moreClass="scale-[.65]" />
                ) : (
                  <IconBlankIcon />
                )}
                {el.value}
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
