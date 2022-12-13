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
        url: `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BACKEND_URL
            : "http://localhost:8000/api"
        }/users/forgotPassword`,
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
      <div className="grid  w-[90%] sm:w-[65%] md:w-[55%] lg:w-[45%]  mx-auto mt-20 xl:mt-24 rounded-lg shadow-2xl h-72 sm:h-72 lg:h-80 ">
        <div>
          <h1 className="mt-8 text-2xl font-bold text-center sm:text-3xl text-cyan-900">
            Forgot Password
          </h1>
        </div>

        <div className="w-[100%] mx-auto  mt-7 sm:mt-4">
          {/* <label className="my-auto text-lg ">Email</label> */}
          <input
            type="email"
            value={enteredEmail}
            placeholder="Email"
            className={`px-3 py-2.5 lg:py-3 bg-transparent focus:ring-blue-slate-400 focus:outline focus:outline-slate-400 flex mx-auto rounded-lg w-[90%] sm:w-[60%] text-gray-500 text-sm sm:text-base border ${
              focusInp && !enteredEmail ? "border-red-200" : ""
            }`}
            onChange={clickHandler}
            onBlur={handleFocus}
          />
        </div>

        <div className="mx-auto ">
          <button
            className={` px-20 py-1 lg:py-1.5 mt-5 sm:mt-3  mb-5 text-xl text-white bg-cyan-800 rounded-lg shadow-lg hover:bg-cyan-900 ${
              !enteredEmail ? "cursor-not-allowed opacity-50" : ""
            } `}
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
