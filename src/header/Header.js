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
import Message from "../user/Message";
const Header = (props) => {
  const location = useLocation();
  const userId = useSelector((state) => state.sign.userId);
  const showMessages = useSelector((state) => state.message.showMessage);
  const ctx = useContext(SocketContext);

  const [notifications, setNotification] = useState();
  const page = location.pathname === "/signup" ? true : false;
  console.log(page);

  const isLogged = useSelector((state) => state.sign.isLoggedIn);
  console.log(isLogged);
  const img = useSelector((state) => state.sign.userImage);

  const myUser = useSelector((state) => state.sign.userId);
  const [show, setShow] = useState(false);
  const updateMessage = useSelector((state) => state.message.updateMessage);
  const dispatch = useDispatch();
  const showMessage = useSelector((state) => state.message.showMessage);
  const num = useSelector((state) => state.message.numMessage);

  let token = Cookies.get("token");

  const [messageNumber, setMessageNumber] = useState(0);

  console.log(num);
  const number = 0;
  const history = useHistory();
  console.log(myUser);

  if (ctx.socket) {
    ctx.socket.on("newNotification", () => {
      console.log("Notf From Header");
      if (!showMessage) {
        dispatch(MessageActions.setNumMessage({ numMessage: num + 1 }));
      }
    });
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const Req = await axios({
          method: "POST",
          url: `${
            process.env.NODE_ENV === "production"
              ? "https://gabaaecom.onrender.com/api/"
              : "http://localhost:8000/api/"
          }users/getChats`,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          data: { myUser, number },
        });

        console.log(Req);

        dispatch(
          MessageActions.setNumMessage({
            numMessage: Req.data.num,
            caller: "Header.js",
          })
        );
      } catch (err) {
        console.log(err.response.data.message);
        if (token) {
          dispatch(SignActions.signOut());
          history.go(0);
        }
      }
    };

    getData();
  }, [myUser]);

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
    <div>
      {showMessages && <Message />}

      <div className="border-2 shadow-2xl">
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
              <h1 className="flex items-center ml-2 font-mono text-lg text-cyan-900 sm:text-base justify">
                GABAA
              </h1>
            </div>
            <div className="flex items-center space-x-5 justify-items-center">
              {!isLogged && location.pathname !== "/signup" && (
                <Link
                  to="/signup"
                  className="px-2 py-0 font-mono text-white bg-green-800 rounded-lg h-7 hover:bg-blue-600"
                >
                  SIGN UP
                </Link>
              )}
              {!isLogged && location.pathname !== "/signin" && (
                <Link
                  to="/signin"
                  className="px-2 py-0 font-mono text-center text-white bg-green-700 rounded-lg h-7 hover:bg-green-800"
                >
                  SIGN IN
                </Link>
              )}

              {isLogged && (
                <img
                  onClick={imgClickHandler}
                  className="object-cover w-10 h-10 rounded-full"
                  src={`https://gabaa-app-resource.s3.amazonaws.com/${img}`}
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
                      className="w-6 h-6 text-cyan-900"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>

                  {num > 0 && (
                    <div className="absolute transform translate-x-4 -translate-y-1">
                      <div className="flex items-center justify-center w-3 h-3 mx-auto bg-red-700 rounded-full">
                        <span className="text-xs text-white ">
                          {num ? num : ""}
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              )}

              {isLogged && (
                <button
                  onClick={signOutHandler}
                  className="justify-end px-2 py-1 font-mono text-sm text-white rounded-lg bg-cyan-900 hover:bg-gray-800"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
