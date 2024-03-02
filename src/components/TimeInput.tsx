"use client";

const TimeInput = (props: {
  time: number;
  setTime: (time: number) => void;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="border-2 rounded border-neutral-800 flex flex-row">
        <button className="px-3" onClick={() => props.setTime(props.time + 60)}>
          +
        </button>
        <div className="border-x-2 border-neutral-800 p-2">
          {Math.floor(props.time / 60)}
          {" minutes"}
        </div>
        <button
          className="px-3"
          onClick={() => {
            if (props.time - 60 >= 0) props.setTime(props.time - 60);
          }}
        >
          -
        </button>
      </div>
      <p>and</p>
      <div className="border-2 rounded border-neutral-800 flex flex-row">
        <button className="px-3" onClick={() => props.setTime(props.time + 15)}>
          +
        </button>
        <div className="border-x-2 border-neutral-800 p-2">
          {props.time % 60}
          {" seconds"}
        </div>
        <button
          className="px-3"
          onClick={() => {
            if (props.time - 15 >= 0) props.setTime(props.time - 15);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export { TimeInput };
