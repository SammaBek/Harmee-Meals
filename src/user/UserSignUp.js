import { useRef, Fragment, useContext } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import ErrorContext from "../store/Error-Context";
import { Link, useLocation } from "react-router-dom";
import useHttp from "../hooks/Use-Http";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SignActions } from "../store/AppWideState";
import ImageUploader from "../utils/ImageUploader";
const UserSignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { sendRequest } = useHttp();

  const errCtx = useContext(ErrorContext);

  const location = useLocation();
  console.log(location.pathname);

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const applyData = (val) => {
    if (val) {
      console.log(val);
      dispatch(
        SignActions.signUp({
          token: val.token,
          userId: val.theUser.userId,
        })
      );

      if (errCtx.errorMessage === "") {
        nameInput.current.value = "";
        emailInput.current.value = "";
        passwordInput.current.value = "";
      }

      history.push("/mealsDemo");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userName = nameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    sendRequest(
      {
        method: "POST",
        url: "http://localhost:8000/api/users/signup",
        data: { userName, email, password },
      },
      applyData
    );

    console.log(userName, password, email);
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
        <ImageUploader />

        <button
          onClick={submitHandler}
          type="submit"
          className="px-4 py-1 mb-10 ml-10 bg-red-400 rounded-lg hover:bg-red-500"
        >
          Sign Up
        </button>

        <Link
          className="ml-4 text-blue-400 hover:text-red-300"
          to="/forgotPassword"
        >
          Forgot Password ?
        </Link>
      </div>
    </Fragment>
  );
};

export default UserSignUp;
