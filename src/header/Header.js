import React, { useContext } from "react";
import SignedContext from "../store/Sign-Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
const Header = () => {
  const location = useLocation();

  const page = location.pathname === "/signup" ? true : false;
  console.log(page);

  const isLogged = localStorage.getItem("logged");
  console.log(isLogged);
  const img = useSelector((state) => state.sign.userImage);

  const dispatch = useDispatch();
  const ctx = useContext(SignedContext);
  const history = useHistory();

  const signOutHandler = () => {
    dispatch(SignActions.signOut());
    history.push("/signup");
  };

  const imgClickHandler = () => {
    history.push("/userpage");
  };

  return (
    <div className=" bg-gradient-to-r from-gray-300 via-purple-500 to-pink-300">
      <nav>
        <div className="flex justify-between px-5 py-2">
          <div className="flex space-x-5 ">
            <Link to="/">
              <svg
                className="w-12 h-12 "
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#60a5fa"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z" />
              </svg>
            </Link>
            <h1 className="flex items-center text-2xl text-blue-400 justify">
              Harmee Meal
            </h1>
          </div>
          <div className="flex items-center mr-10 space-x-5 justify-items-center">
            {isLogged === "false" && location.pathname !== "/signup" && (
              <Link
                to="/signup"
                className="px-2 py-0 bg-blue-400 rounded-lg h-7 hover:bg-blue-600"
              >
                Sign Up
              </Link>
            )}
            {isLogged === "false" && location.pathname !== "/signin" && (
              <Link
                to="/signin"
                className="px-2 bg-red-400 rounded-lg h-7 hover:bg-red-500"
              >
                Sign In
              </Link>
            )}

            {isLogged === "true" && (
              <img
                onClick={imgClickHandler}
                className="w-16 h-16 rounded-full"
                src={`http://localhost:8000/${localStorage.getItem(
                  "userImage"
                )}`}
                alt="Pic"
              />
            )}
            {isLogged === "true" && (
              <button
                onClick={signOutHandler}
                className="px-2 bg-red-400 rounded-lg h-7 hover:bg-red-500"
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
