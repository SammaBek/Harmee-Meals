import React, { useEffect, useContext, useState } from "react";
import SignedContext from "../store/Sign-Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import { NotificationActions } from "../store/Notification-Slice";
import { MessageActions } from "../store/Message-Slice";
import axios from "axios";
import Cookies from "js-cookie";
import SocketContext from "../store/Socket-Context";
import { ErrorAction } from "../store/Error-Slice";
const Header = (props) => {
  const location = useLocation();
  const notNum = useSelector((state) => state.notf.notificationNum);
  const userId = useSelector((state) => state.sign.userId);
  const ctx = useContext(SocketContext);

  const [notifications, setNotification] = useState();
  const page = location.pathname === "/signup" ? true : false;
  console.log(page);

  const isLogged = useSelector((state) => state.sign.isLoggedIn);
  console.log(isLogged);
  const img = useSelector((state) => state.sign.userImage);

  useEffect(() => {
    const getData = async () => {
      if (userId) {
        try {
          // ${localStorage.getItem("token")}
          const Req = await axios({
            method: "GET",
            url: `http://localhost:8000/api/meals/getnotification/${userId}`,
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          });
          setNotification(Req.data);
          if (Req.data.notifications.length > 0) {
            dispatch(
              NotificationActions.setNum({ num: Req.data.notifications.length })
            );
            dispatch(NotificationActions.setMessage());
          }
        } catch (err) {
          console.log(err.response.data.message);
          dispatch(
            ErrorAction.setError({ errorMessage: err.response.data.message })
          );
        }
      }
    };

    getData();
  }, []);

  console.log(notifications);

  const dispatch = useDispatch();

  const history = useHistory();

  const signOutHandler = () => {
    dispatch(SignActions.signOut());
    dispatch(NotificationActions.signOut());

    history.push("/signup");
  };

  const imgClickHandler = () => {
    history.push("/userpage");
  };

  const showMessageHandler = () => {
    dispatch(MessageActions.changeShowMessage());
  };

  return (
    <div className=" bg-gradient-to-tr from-blue-600 to-red-500">
      <nav className="">
        <div className="flex justify-between px-5 py-1">
          <div className="flex ">
            <Link to="/">
              <svg
                className="sm:w-12 sm:h-12 h-9 w-9 "
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill=""
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z" />
              </svg>
            </Link>
            <h1 className="flex items-center ml-2 text-sm text-white sm:text-base justify">
              Gabaa
            </h1>
          </div>
          <div className="flex items-center space-x-5 justify-items-center">
            {!isLogged && location.pathname !== "/signup" && (
              <Link
                to="/signup"
                className="px-2 py-0 bg-blue-400 rounded-lg h-7 hover:bg-blue-600"
              >
                Sign Up
              </Link>
            )}
            {!isLogged && location.pathname !== "/signin" && (
              <Link
                to="/signin"
                className="px-2 bg-red-400 rounded-lg h-7 hover:bg-red-500"
              >
                Sign In
              </Link>
            )}

            {isLogged && (
              <img
                onClick={imgClickHandler}
                className="w-10 h-10 rounded-full"
                src={`http://localhost:8000/${img}`}
                alt="Pic"
              />
            )}

            {isLogged && (
              <button onClick={showMessageHandler} className="flex ">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-100"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="absolute transform translate-x-4 -translate-y-1">
                  <div className="flex items-center justify-center w-3 h-3 mx-auto bg-red-700 rounded-full">
                    <span className="text-xs text-white ">9</span>
                  </div>
                </div>
              </button>
            )}

            {isLogged && (
              <Link to="/" className="flex">
                <div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-gray-100"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </span>
                </div>

                <div className="absolute transform translate-x-3 -translate-y-2">
                  <div className="flex items-center justify-center w-4 h-4 font-bold text-white bg-red-700 rounded-full">
                    <span className="text-xs ">{notNum}</span>
                  </div>
                </div>
              </Link>
            )}

            {isLogged && (
              <button
                onClick={signOutHandler}
                className="justify-end px-2 text-sm bg-red-400 rounded-lg hover:bg-red-500"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
