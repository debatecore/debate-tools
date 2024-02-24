import { EventHandler } from "react";

type CheckboxProps = {
  name: string;
  value: string;
  labelText: string;
  key: string;
  disabled?: boolean;
  onChange?: any;
};

const Checkbox = (props: CheckboxProps) => {
  return (
    <label className="flex flex-row justify-between">
      <span className={props.disabled ? "mr-2 text-neutral-500" : "mr-2"}>
        {props.labelText}
      </span>
      <input
        className=""
        type="checkbox"
        name={props.name}
        value={props.value}
        key={props.key}
        disabled={props.disabled}
        onChange={props.onChange}
      />
    </label>
  );
};

export { Checkbox };
