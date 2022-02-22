import react, { useRef, useContext, Fragment } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import SignedContext from "../store/Sign-Context";
import ErrorContext from "../store/Error-Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { SignActions } from "../store/AppWideState";
import Cookies from "js-cookie";
import useHttp from "../hooks/Use-Http";

const UserSignIn = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const ctx = useContext(SignedContext);
  const errCtx = useContext(ErrorContext);
  const inputEmail = useRef();
  const inputPassword = useRef();
  const history = useHistory();
  let user;

  const { sendRequest } = useHttp();

  const applyData = (user) => {
    console.log(isLoggedIn);
    console.log(user);
    if (user) {
      dispatch(
        SignActions.signIn({
          token: user.token,
          userId: user.theUser.userId,
        })
      );

      inputPassword.current.value = "";
      inputEmail.current.value = "";
      history.push("/mealsDemo");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    sendRequest(
      {
        method: "POST",
        url: "http://localhost:8000/api/users/login",
        data: { email, password },
      },
      applyData
    );
  };
  return (
    <Fragment>
      {errCtx.isError && <ErrorModal />}
      <div className="h-auto max-w-md mx-auto mt-10 rounded-lg shadow-xl bg-blue-50">
        <h1 className="py-8 text-xl text-center">Welcome To Sign In page</h1>
        <div></div>

        <div className="flex mb-10 space-x-5">
          <div className="grid grid-flow-row ml-10 space-y-2">
            <label>Email</label>
            <label>Password</label>
          </div>

          <div className="grid grid-flow-row space-y-2">
            <UserInputComp
              ref={inputEmail}
              input={{
                type: "email",
                placeholder: "Email",
                className: "w-40 px-3 rounded-lg ",
              }}
            />

            <UserInputComp
              ref={inputPassword}
              input={{
                type: "password",
                placeholder: "Password",
                className: "w-40 px-3 rounded-lg",
              }}
            />
          </div>
        </div>

        <button
          onClick={submitHandler}
          type="submit"
          className="px-4 py-1 mb-10 ml-10 bg-red-400 rounded-lg hover:bg-red-500"
        >
          Sign In
        </button>
      </div>
    </Fragment>
  );
};

export default UserSignIn;
