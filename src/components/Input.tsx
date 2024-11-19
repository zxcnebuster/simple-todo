import { useState, forwardRef } from "react";

type InputProps = React.HTMLProps<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  return (
    <>
      <input
        className="mb-2 w-[100%] self-center rounded-xl bg-blue-100 focus:outline-none px-2"
        type="text"
        ref={ref}
      />
    </>
  );
});

export default Input;
