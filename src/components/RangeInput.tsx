import React, { Dispatch, SetStateAction } from "react";

function RangeInput({
  value,
  step,
  min,
  max,
  set,
}: {
  value: number;
  step: number;
  min: number;
  max: number;
  set: Dispatch<SetStateAction<number>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set(+e.target.value);
  };

  return (
    <input
      type="range"
      className="w-full"
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
}

export default RangeInput;
