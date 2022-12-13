import react, { useRef, useContext, Fragment, useState } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import { ErrorAction } from "../store/Error-Slice";
import { NotificationActions } from "../store/Notification-Slice";
import { Link } from "react-router-dom";
import shopping20 from "../img/shopping20.webp";

import Spinner from "../header/Spinner";
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
          url: `${
            process.env.NODE_ENV === "production"
              ? "https://gabaa.herokuapp.com/api/"
              : "http://localhost:8000/api/"
          }meals/getnotification/${user.theUser.id}`,
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
          phone: user.theUser.phone,
          joined: user.theUser.createdAt,
          address: user.theUser.address,
        })
      );

      console.log(isLoggedIn);
      inputPassword.current.value = "";
      inputEmail.current.value = "";

      setIsLoading(false);

      history.push("/userpage");
    } else {
      history.push("/signin");
    }
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    console.log(process.env.NODE_ENV);
    sendRequest(
      {
        method: "POST",
        url: `${
          process.env.NODE_ENV === "production"
            ? "https://gabaa.herokuapp.com/api/"
            : "http://localhost:8000/api/"
        }users/login`,
        data: { email, password },
        pageTo: "signin",
      },
      applyData
    );
  };

  return (
    <Fragment>
      {isError && <ErrorModal />}

      <div className={`grid min-h-screen debug-screens `}>
        <div className="p-2 mx-auto sm:w-[60%]  mt-20 mb-3 lg:mt-24 xl:mt-32   h-96 lg:w-[40%] xl:w-[35%]  w-[85%] md:w-[50%] md:h-96 rounded-xl shadow-2xl">
          <div className="py-3 mt-4 text-center md:py-5">
            <span className="font-mono text-xl font-bold text-green-800 md:text-2xl">
              WELCOME TO{" "}
            </span>{" "}
            <span className="font-mono text-xl font-bold text-green-800 md:text-2xl ">
              GABAA E-COMM
            </span>
          </div>

          <div className="grid w-[80%] lg:w-[75%] grid-flow-row mt-4 ml-6">
            <div className=" md:mt-2">
              <label className="font-semibold text-green-800">
                Email address
              </label>
            </div>

            <div>
              <input
                className="w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 rounded-md lg:py-3 text-cyan-900 md:mt-2 focus:ring-1 focus:indigo-500"
                placeholder="Email"
                ref={inputEmail}
                type="email"
              />
            </div>

            <div className="mt-3 md:mt-2">
              <label className="font-semibold text-green-800">Password</label>
            </div>
            <div>
              <input
                className="w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 rounded-md lg:py-3 text-cyan-900 md:mt-2 focus:ring-1 focus:indigo-500"
                placeholder="Password"
                ref={inputPassword}
                type="password"
              />
            </div>

            <div className="flex-row mt-2 md:mt-6">
              <button
                onClick={submitHandler}
                type="submit"
                className="w-32 py-1 mt-4 mb-3 text-lg text-white border rounded-lg sm:px-8 bg-cyan-800 md:ml-1 hover:bg-gray-700"
              >
                Sign In
              </button>

              <Link
                className="ml-2 text-green-800 sm:text-base lg:text-lg hover:text-red-300"
                to="/forgotPassword"
              >
                Forgot Password ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserSignIn;
