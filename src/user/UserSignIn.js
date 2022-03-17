import react, { useRef, useContext, Fragment } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import SignedContext from "../store/Sign-Context";
import ErrorContext from "../store/Error-Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import Cookies from "js-cookie";
import useHttp from "../hooks/Use-Http";
import axios from "axios";

const UserSignIn = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);
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
      try {
        dispatch(
          SignActions.signIn({
            token: user.token,
            userId: user.theUser.id,
            userImage: user.theUser.image,
            userName: user.theUser.userName,
            userEmail: user.theUser.email,
          })
        );
      } catch (err) {
        console.log(err);
      }
      console.log(isLoggedIn);
      inputPassword.current.value = "";
      inputEmail.current.value = "";
      history.push("/userpage");
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
      <div className="grid h-screen bg-gradient-to-r from-green-100 via-indigo-200 to-pink-200">
        <div className="w-1/3 mx-auto mt-20 h-1/2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="py-8 mt-4 text-center">
            <span className="text-4xl text-white">Welcome to </span>{" "}
            <span className="text-4xl text-green-400 ">Gabaa Auction</span>
          </div>

          <div className="grid w-2/3 grid-flow-row ml-6">
            <div>
              <label className="text-white ">Email address</label>
            </div>

            <div>
              <UserInputComp
                ref={inputEmail}
                input={{
                  type: "email",
                  placeholder: "Email",
                  className:
                    "px-3 py-2 rounded-md  mt-1 border-2 w-full border border-gray-300 bg-transparent text-gray-100",
                }}
              />
            </div>

            <div>
              <label className="text-white ">Password</label>
            </div>
            <div>
              <UserInputComp
                ref={inputPassword}
                input={{
                  type: "password",
                  placeholder: "Password",
                  className:
                    "px-3 py-2 rounded-md border-2 mt-1 w-full border border-gray-300 focus:ring-1 focus:indigo-500 bg-transparent text-gray-100",
                }}
              />
            </div>

            <div>
              <button
                onClick={submitHandler}
                type="submit"
                className="px-8 py-1 mt-4 mb-6 ml-10 text-lg text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserSignIn;
