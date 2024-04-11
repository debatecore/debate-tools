import { EventHandler } from "react";

type CheckboxProps = {
  name: string;
  value: string;
  labelText: string;
  checkboxKey: string;
  disabled?: boolean;
  onChange?: any;
  checked?: boolean;
};

const Checkbox = (props: CheckboxProps) => {
  return (
    <label className="flex flex-row justify-between select-none cursor-pointer">
      <span className={props.disabled ? "mr-2 text-neutral-500" : "mr-2"}>
        {props.labelText}
      </span>
      <input
        className="cursor-pointer"
        type="checkbox"
        name={props.name}
        value={props.value}
        key={props.checkboxKey}
        disabled={props.disabled}
        onChange={props.onChange}
        checked={props.checked}
      />
    </label>
  );
};

export { Checkbox };
