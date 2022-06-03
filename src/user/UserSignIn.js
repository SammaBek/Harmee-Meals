import react, { useRef, useContext, Fragment, useState } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import { ErrorAction } from "../store/Error-Slice";
import { NotificationActions } from "../store/Notification-Slice";

import Spinner from "../utils/SpinnerLoading";
import Cookies from "js-cookie";
import useHttp from "../hooks/Use-Http";
import axios from "axios";
import SocketContext from "../store/Socket-Context";

const UserSignIn = () => {
  const ctx = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);
  const isError = useSelector((state) => state.error.isError);
  let Req;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);
  const inputEmail = useRef();
  const inputPassword = useRef();
  const history = useHistory();
  let user;
  const [notifications, setNotification] = useState();

  const { sendRequest } = useHttp();

  const applyData = async (user) => {
    console.log(isLoggedIn);
    console.log(user);

    if (user) {
      Cookies.set("token", user.token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      try {
        Req = await axios({
          method: "GET",
          url: `http://localhost:8000/api/meals/getnotification/${user.theUser.id}`,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
      } catch (err) {
        console.log(err.response.data.message);
        dispatch(
          ErrorAction.setError({ ErrorMessage: err.response.data.message })
        );
      }

      setNotification(Req.data);
      if (Req.data.notifications.length > 0) {
        console.log(Req.data.notifications.length);
        dispatch(
          NotificationActions.setNum({ num: Req.data.notifications.length })
        );
        dispatch(
          NotificationActions.newMessage({
            message: Req.data.notifications,
          })
        );
      }

      dispatch(
        SignActions.signIn({
          token: user.token,
          userId: user.theUser.id,
          userImage: user.theUser.image,
          userName: user.theUser.userName,
          userEmail: user.theUser.email,
        })
      );

      console.log(isLoggedIn);
      inputPassword.current.value = "";
      inputEmail.current.value = "";

      setIsLoading(false);

      history.push("/userpage");
    }
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
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
      {isError && <ErrorModal />}
      <div
        className={`grid min-h-screen debug-screens bg-gradient-to-r from-slate-700 via-blue-500 to-black ${
          isLoading ? "animate-pulse" : ""
        }`}
      >
        <div className="p-2 mx-auto sm:w-[50%] xl:my-auto mt-20 mb-3 border  h-80 lg:w-[40%] xl:w-[35%]  w-80 md:w-[50%] md:h-96 rounded-xl">
          <div className="py-3 mt-4 text-center md:py-5">
            <span className="text-xl text-white md:text-2xl">Welcome to </span>{" "}
            <span className="text-xl text-green-400 md:text-2xl ">
              Gabaa Auction
            </span>
          </div>

          <div className="grid w-2/3 grid-flow-row ml-6">
            <div className=" md:mt-2">
              <label className="text-white ">Email address</label>
            </div>

            <div>
              <UserInputComp
                ref={inputEmail}
                input={{
                  type: "email",
                  placeholder: "Email",
                  className:
                    "px-3 py-1 md:py-2 rounded-md md:mt-2  mt-1 border w-full border border-gray-300 bg-transparent text-gray-100",
                }}
              />
            </div>

            <div className=" md:mt-2">
              <label className="text-white ">Password</label>
            </div>
            <div>
              <UserInputComp
                ref={inputPassword}
                input={{
                  type: "password",
                  placeholder: "Password",
                  className:
                    "px-3 py-1 md:py-2 md:mt-2 rounded-md border mt-1 w-full border border-gray-300 focus:ring-1 focus:indigo-500 bg-transparent text-gray-100",
                }}
              />
            </div>

            <div className=" md:mt-6">
              <button
                onClick={submitHandler}
                type="submit"
                className="px-8 py-1 mt-4 mb-3 ml-10 text-lg text-white bg-transparent border rounded-lg md:ml-1 hover:bg-gray-700 "
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
