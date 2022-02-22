import { useState } from "react";

const useInput = () => {
  const [enteredInput, setEnteredInput] = useState("");
  const [focusInp, setFocus] = useState(false);

  const clickHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const handleFocus = () => {
    if (enteredInput.trim() === "") {
      setFocus(true);
    }
  };

  const reset = () => {
    setEnteredInput("");
    setFocus(false);
  };

  return {
    enteredInput,
    focusInp,
    clickHandler,
    handleFocus,
    reset,
  };
};

export default useInput;
