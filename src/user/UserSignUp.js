import { react, useRef, Fragment, useContext } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import axios from "axios";
import ErrorContext from "../store/Error-Context";
import { data } from "autoprefixer";
const UserSignUp = () => {
  const errCtx = useContext(ErrorContext);
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userName = nameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    console.log(userName, password, email);
    let val;
    try {
      val = await axios.post("http://localhost:8000/api/users/signup", {
        userName,
        email,
        password,
      });
      //   console.log(val.ok);
      //   if (!val.ok) {
      //     throw new Error(val.message, 400);
      //   }
    } catch (err) {
      console.log(err.response.data.message);
      const errMsg = err.response.data.message;
      errCtx.setErrorMessage(errMsg);
    }
    if (errCtx.errorMessage === "") {
      nameInput.current.value = "";
      emailInput.current.value = "";
      passwordInput.current.value = "";
    }
  };

  return (
    <Fragment>
      {errCtx.isError && <ErrorModal />}
      <div className="h-auto max-w-md mx-auto rounded-lg shadow-xl bg-blue-50">
        <h2 className="mt-5 text-3xl text-center text-red-300 py-7">
          {" "}
          Welcome To Sign Up Page
        </h2>
        <div className="grid grid-flow-row mx-auto justify-items-center">
          <div className="grid w-3/5 grid-flow-col gap-0 px-4 mt-5">
            <label>Name</label>

            <UserInputComp
              ref={nameInput}
              input={{
                type: "text",
                placeholder: "Name",
                className: "w-40 px-3 rounded-lg ml-9",
              }}
            />
          </div>

          <div className="grid w-3/5 grid-flow-col gap-0 px-4 mt-5">
            <label>Email</label>

            <UserInputComp
              ref={emailInput}
              input={{
                type: "email",
                placeholder: "Email",
                className: "w-40 px-3 rounded-lg ml-9",
              }}
            />
          </div>

          <div className="grid w-3/5 grid-flow-col gap-0 px-4 mt-5 mb-10">
            <label>Password</label>
            <UserInputComp
              ref={passwordInput}
              input={{
                type: "password",
                placeholder: "Password",
                className: "w-40 px-3 rounded-lg ml-2",
              }}
            />
          </div>
        </div>

        <button
          onClick={submitHandler}
          type="submit"
          className="px-4 py-1 mb-10 ml-10 bg-red-400 rounded-lg hover:bg-red-500"
        >
          Sign Up
        </button>
      </div>
    </Fragment>
  );
};

export default UserSignUp;
