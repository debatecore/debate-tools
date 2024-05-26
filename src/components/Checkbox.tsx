type CheckboxProps = {
  name: string;
  value: string;
  labelText: string;
  disabled?: boolean;
  onChange?: any;
  checked?: boolean;
};

const Checkbox = (props: CheckboxProps) => {
  return (
    <label className="flex flex-row justify-between select-none cursor-pointer mt-1 mb-2 xl:m-0">
      <span
        className={
          props.disabled
            ? "text-xs xl:text-base mr-2 text-neutral-500"
            : "text-xs xl:text-base mr-2"
        }
      >
        {props.labelText}
      </span>
      <input
        className="cursor-pointer"
        type="checkbox"
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        checked={props.checked}
      />
    </label>
  );
};

export { Checkbox };
