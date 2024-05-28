"use client";

const TimeInput = (props: { time: number; setTime: (time: number) => void }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-4 items-center">
      <div className="flex flex-row">
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-l"
          disabled={!(props.time - 60 >= 0)}
          onClick={() => {
            if (props.time - 60 >= 0) props.setTime(props.time - 60);
          }}
        >
          -
        </button>
        <div className="border-y-2 border-neutral-800 min-w-32 flex flex-row justify-center p-2">
          {Math.floor(props.time / 60)}
          {" minutes"}
        </div>
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-r disabled:text-neutral-500 disabled:hover:bg-transparent disabled:hover:border-neutral-800 disabled:cursor-not-allowed"
          onClick={() => props.setTime(props.time + 60)}
        >
          +
        </button>
      </div>
      <p>and</p>
      <div className="flex flex-row">
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-l"
          disabled={!(props.time - 15 >= 0)}
          onClick={() => {
            if (props.time - 15 >= 0) props.setTime(props.time - 15);
          }}
        >
          -
        </button>
        <div className="border-y-2 border-neutral-800 min-w-32 flex flex-row justify-center p-2">
          {props.time % 60}
          {" seconds"}
        </div>
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-r disabled:text-neutral-500 disabled:hover:bg-transparent disabled:hover:border-neutral-800 disabled:cursor-not-allowed"
          onClick={() => props.setTime(props.time + 15)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export { TimeInput };
