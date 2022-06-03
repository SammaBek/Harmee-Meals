import { useSelector } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import { Link, NavLink, useHistory, useParams, Route } from "react-router-dom";
import Header from "../header/Header";
import { useRef, useState, Fragment } from "react";
import UserPageNav from "./UserPageNav";
import useHttp from "../hooks/Use-Http";
import { useDispatch } from "react-redux";
import EditUserPage from "./EditUserPage";
import Cookies from "js-cookie";
import ResetPassword from "./ResetPassword";
import AddMeal from "./AddProduct";
import UserNotification from "./UserNotification";
import { data } from "autoprefixer";
import Spinners from "../utils/SpinnerLoading";
import { useLocation } from "react-router-dom";

const UserPage = () => {
  const pid = useParams();
  const { sendRequest } = useHttp();
  const [show, setShow] = useState(false);

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

  const location = useLocation();

  console.log(location.pathname);

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
    <Fragment>
      <div className="grid min-h-screen bg-gradient-to-r from-slate-700 via-blue-500 to-black">
        <div className="md:w-[75%] text-xs sm:w-[90%] ml-2 w-[95%] lg:w-[60%] xl:w-[55%] sm:mx-auto  border shadow-2x mt-20   h-96 xl:mt-36 sm:mt-24 lg:mt-32 md:mt-24  rounded-2xl">
          <div className="">
            <UserPageNav />
          </div>

          <div className="flex mt-5 gap-x-2 sm:gap-x-10">
            <div className="grid w-32 grid-flow-col mt-5 ml-1 border shadow-xl h-36 sm:ml-5 md:ml-7 sm:w-44 sm:h-44 xl:w-56 xl:h-56 bg-gradient-to-r rounded-xl">
              <div className="">
                <img
                  className="w-24 h-24 mt-3 ml-2 rounded-full shadow-xl xl:w-36 xl:h-36 sm:w-28 sm:h-28"
                  src={`http://localhost:8000/${img ? img : imgs}`}
                  alt="pic"
                ></img>

                <p className="ml-2 text-lg text-blue-400">{userName}</p>
              </div>
            </div>
            {location.pathname === "/userpage" && (
              <div className="w-40 gap-3 my-auto ">
                <div className="flex gap-1 mt-3 text-sm text-white sm:text-base md:text-lg">
                  <div>Email:</div>
                  <div className=" sm:ml-8">{email}</div>
                </div>
                <div className="flex gap-1 mt-3 text-sm text-white sm:text-base md:text-lg">
                  <div>Phone:</div>
                  <div className=" sm:ml-6">{email}</div>
                </div>
                <div className="flex gap-1 mt-3 text-sm text-white sm:text-base md:text-lg">
                  <div>Address:</div>
                  <div className=" sm:ml-3">{email}</div>
                </div>
              </div>
            )}
            <Route exact path="/userpage/notification">
              <UserNotification />
            </Route>
            <Route exact path="/userpage/addproduct">
              <AddMeal />
            </Route>
            <Route exact path="/userpage/resetpassword">
              <ResetPassword
                currPassInput={currentPassInput}
                newPassInput={newPassInput}
                saveHandler={updateHandler}
              />
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserPage;
