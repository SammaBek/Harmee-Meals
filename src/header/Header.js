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
  const notNum = useSelector((state) => state.notf.notificationNum);
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

  console.log(num);
  const number = 0;
  const history = useHistory();
  console.log(myUser);

  useEffect(() => {
    const getData = async () => {
      try {
        const Req = await axios({
          method: "POST",
          url: "http://localhost:8000/api/users/getChats",
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          data: { myUser, number },
        });

        console.log(Req);

        dispatch(MessageActions.setNumMessage({ numMessage: Req.data.num }));
      } catch (err) {
        console.log(err.response.data.message);
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

                  {num !== 0 && (
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
                  className="justify-end px-2 text-sm bg-red-400 rounded-lg hover:bg-red-500"
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
