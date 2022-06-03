import UserInputComp from "../user/UserInputComp";
import { useRef, useState } from "react";
import axios from "axios";
import useInput from "../hooks/Use-Input";
const ForgotPassword = () => {
  const {
    enteredInput: enteredEmail,
    focusInp,
    clickHandler,
    handleFocus,
    reset,
  } = useInput();

  const formHandler = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "PATCH",
        url: "http://localhost:8000/api/users/forgotPassword",
        data: { email: enteredEmail },
      });
      reset();
    } catch (err) {
      console.log(err);
    }

    console.log(enteredEmail);
  };

  return (
    <form onSubmit={formHandler}>
      <div className="grid justify-center w-1/3 grid-flow-row mx-auto mt-20 rounded-lg shadow-xl h-4/6 bg-blue-50">
        <h1 className="mt-3 text-4xl font-bold text-cyan-800">
          Forgot Password
        </h1>
        <div className="grid max-w-sm grid-flow-col mt-10">
          <label className="my-auto text-lg ">Email</label>
          <input
            type="email"
            value={enteredEmail}
            placeholder="Email"
            className={`px-5 py-2 rounded-lg w-50 ml-9 ${
              focusInp && !enteredEmail ? "bg-red-100" : ""
            }`}
            onChange={clickHandler}
            onBlur={handleFocus}
          />
        </div>
        <button
          className={`px-2 py-1 mt-5 mb-5 text-xl text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700 ${
            !enteredEmail ? "cursor-not-allowed opacity-50" : ""
          } `}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
