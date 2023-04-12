import { useSelector } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import { Link, NavLink, useHistory, useParams, Route } from "react-router-dom";
import Header from "../header/Header";
import { useRef, useState, Fragment, useEffect } from "react";
import UserPageNav from "./UserPageNav";
import useHttp from "../hooks/Use-Http";
import { useDispatch } from "react-redux";
import EditUserPage from "./EditUserPage";
import Cookies from "js-cookie";
import ResetPassword from "./ResetPassword";
import AddMeal from "./AddProduct";
import { data } from "autoprefixer";
import Spinners from "../utils/SpinnerLoading";
import { useLocation } from "react-router-dom";
import shopping12 from "../img/shopping12.webp";
import Nav from "./Nav";
import moment from "moment";
import ImageUploader from "../utils/ImageUploader";
const UserPage = () => {
  const pid = useParams();
  const { sendRequest } = useHttp();
  const [show, setShow] = useState(false);

  let img = useSelector((state) => state.sign.userImage);
  const [proPicUrl, setProPicUrl] = useState(false);
  const imgs = localStorage.getItem("userImage");
  const [proPic, setProPic] = useState();
  let userName = useSelector((state) => state.sign.userName);
  let email = useSelector((state) => state.sign.userEmail);
  let phone = useSelector((state) => state.sign.phone);
  let address = useSelector((state) => state.sign.address);
  let joined = useSelector((state) => state.sign.joined);
  const nameInput = useRef();
  const emailInput = useRef();
  const currentPassInput = useRef();
  const newPassInput = useRef();
  const phoneInput = useRef();
  const addressInput = useRef();
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
            address: user.Data.address,
            phone: user.Data.phone,
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
        url: `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BACKEND_URL
            : "http://localhost:8000/api"
        }/users/updatePassword`,
        data: { currentPass, newPass },
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyPass
    );
  };

  const saveHandler = async (event) => {
    event.preventDefault();

    userName = nameInput.current.value;

    console.log(email, userName);

    sendRequest(
      {
        method: "PATCH",
        url: `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BACKEND_URL
            : "http://localhost:8000/api"
        }/users/updateData`,
        data: {
          userName,
          address: addressInput.current.value,
          phone: phoneInput.current.value,
        },
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyData
    );
  };

  const getImage = (image, valid, imageUrl) => {
    setProPic(image);
    console.log(image);
    setProPicUrl(imageUrl);
    console.log(img);
  };

  useEffect(() => {
    if (!proPic) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setProPicUrl(fileReader.result);
    };

    fileReader.readAsDataURL(proPic);
  }, [proPic]);

  return (
    <Fragment>
      <div className="grid min-h-screen bg-gradient-to-r from-stone-500 via-slate-400 to-stone-500">
        <div className=" bg-stone-100 grid h-[80%] sm:h-[85%] md:h-[80%] xl:h-[83%]  mx-auto md:w-[80%] text-xs sm:w-[90%]  w-[95%] lg:w-[65%] xl:w-[55%] sm:mx-auto   shadow-2xl mt-10 xl:mt-10  sm:mt-14 lg:mt-20 md:mt-20  rounded-2xl mb-10">
          <div className="grid gap-4 sm:mt-5 sm:flex gap-x-2 sm:gap-1">
            <div className="grid mx-auto">
              <img
                className="object-cover w-24 h-24 mx-auto mt-3 rounded-full shadow-2xl xl:w-36 xl:h-36 sm:w-28 sm:h-28 "
                src={proPicUrl}
                alt="pic"
              ></img>

              <div className="flex gap-4 mx-auto">
                <p className="ml-2 text-base text-slate-600">{userName}</p>
                <p className="ml-2 text-base text-slate-600">+{phone}</p>
              </div>
              <ImageUploader onGetImage={getImage} changeProPic={true} />
            </div>
          </div>

          <div className="">
            <Nav />
          </div>

          <div className="grid mx-4 mb-2 rounded-lg shadow-xl sm:mt-4 sm:py-7 md:py-8 xl:mt-4 xl:py-4">
            {location.pathname === "/userpage" && (
              <div className="ml-3  sm:mx-auto md:ml-3 w-[100%] sm:w-[100%] sm:gap-4">
                <div className="flex w-full text-base sm:justify-center sm:mt-2 text-slate-600 md:base sm:gap-3 md:gap-9">
                  <div className="flex gap-5 md:gap-3 sm:max-w-full ">
                    <div className="grid gap-2 text-base text-slate-600 ">
                      <div>Name:</div>
                      <div>Phone:</div>
                      <div>Email:</div>
                      <div>Address:</div>
                      <div>Joined:</div>
                    </div>

                    <div className="grid gap-2 text-base text-slate-600 ">
                      <div className="">{userName}</div>
                      <div className="">{phone}</div>
                      <div className="">{email}</div>
                      <div className="">{address}</div>
                      <div className="">{moment(joined).format("LL")}</div>
                    </div>
                  </div>

                  <div className="hidden  sm:block  w-[40%] lg:w-[40%] md:w-[40%]">
                    <img
                      className="h-40 lg:h-44 w-[90%] rounded-xl object-cover"
                      src={shopping12}
                      alt="pic"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="">
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
                  addressInput={addressInput}
                  phoneInput={phoneInput}
                  email={email}
                  phone={phone}
                  address={address}
                  saveHandler={saveHandler}
                />
              </Route>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserPage;
