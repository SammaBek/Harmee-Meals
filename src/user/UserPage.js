import { useSelector } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import { Link, NavLink, useHistory, useParams, Route } from "react-router-dom";
import Header from "../header/Header";
import { useRef, useState } from "react";
import UserPageNav from "./UserPageNav";
import useHttp from "../hooks/Use-Http";
import { useDispatch } from "react-redux";
import EditUserPage from "./EditUserPage";
import Cookies from "js-cookie";
import ResetPassword from "./ResetPassword";
import AddMeal from "./AddProduct";
import UserNotification from "./UserNotification";
import { data } from "autoprefixer";

const UserPage = () => {
  const pid = useParams();
  const { sendRequest } = useHttp();
  let img = useSelector((state) => state.sign.userImage);
  const imgs = localStorage.getItem("userImage");
  let userName = useSelector((state) => state.sign.userName);
  let email = useSelector((state) => state.sign.userEmail);
  const nameInput = useRef();
  const emailInput = useRef();
  const currentPassInput = useRef();
  const newPassInput = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(userName);
  console.log(email);

  const applyData = (user) => {
    if (user) {
      console.log(user);
      try {
        dispatch(
          SignActions.signIn({
            token: user.token,
            userId: user.Data.id,
            userImage: user.Data.image,
            userName: user.Data.userName,
            userEmail: user.Data.email,
          })
        );
      } catch (err) {
        console.log(err);
      }

      history.push("/userpage");
    }
  };

  const applyPass = (user) => {
    console.log(user);
  };

  const updateHandler = (event) => {
    event.preventDefault();

    let currentPass = currentPassInput.current.value;
    let newPass = newPassInput.current.value;

    sendRequest(
      {
        method: "PATCH",
        url: "http://localhost:8000/api/users/updatePassword",
        data: { currentPass, newPass },
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyPass
    );
  };

  const saveHandler = async (event) => {
    event.preventDefault();

    userName = nameInput.current.value;
    email = emailInput.current.value;

    console.log(email, userName);

    sendRequest(
      {
        method: "PATCH",
        url: "http://localhost:8000/api/users/updateData",
        data: { email, userName },
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyData
    );
  };
  return (
    <div className=" bg-slate-200">
      <div className="absolute max-w-4xl mx-auto mt-24 bg-indigo-500 shadow-lg inset-3 rounded-2xl ">
        <div className="absolute inset-0 max-w-4xl mx-auto mt-64 bg-white h-96"></div>
        <div className="absolute max-w-2xl mx-auto mt-3 shadow-2xl inset-16 bg-gradient-to-r from-green-100 via-indigo-200 to-pink-200 rounded-2xl">
          <UserPageNav />
          <div className="flex mt-5 gap-x-6">
            <div className="grid grid-flow-col mt-5 ml-6 shadow-xl border-1 bg-gradient-to-r h-60 w-60 rounded-xl">
              <div className="">
                <img
                  className="mt-3 ml-2 rounded-full shadow-xl w-36 h-36"
                  src={`http://localhost:8000/${img ? img : imgs}`}
                  alt="pic"
                ></img>

                <p className="ml-2 text-lg text-blue-400">{userName}</p>
              </div>
            </div>

            <Route exact path="/userpage/notification">
              <UserNotification />
            </Route>
            <Route exact path="/userpage/addproduct">
              <AddMeal />
            </Route>
            <Route exact path="/userpage/editpage">
              <EditUserPage
                img={img}
                userName={userName}
                nameInput={nameInput}
                emailInput={emailInput}
                email={email}
                saveHandler={saveHandler}
              />
            </Route>

            <Route exact path="/userpage/resetpassword">
              <ResetPassword
                currPassInput={currentPassInput}
                newPassInput={newPassInput}
                saveHandler={updateHandler}
              />
            </Route>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
