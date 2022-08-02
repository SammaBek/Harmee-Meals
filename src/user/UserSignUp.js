import { useRef, Fragment, useContext, useState } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import { Link, useLocation } from "react-router-dom";
import useHttp from "../hooks/Use-Http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SignActions } from "../store/SignIn-slice";
import ImageUploader from "../utils/ImageUploader";
import img1 from "../img/img.jpeg";
import img2 from "../img/shop.png";

const UserSignUp = () => {
  const ErrorMessage = useSelector((state) => state.error.errorMessage);
  const isError = useSelector((state) => state.error.isError);
  const history = useHistory();
  const dispatch = useDispatch();
  const [img, setImg] = useState();

  const { sendRequest } = useHttp();

  const location = useLocation();
  console.log(location.pathname);

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const phoneInput = useRef();

  const getImage = (image, valid) => {
    setImg(image);
    console.log(img);
  };

  const applyData = (val) => {
    if (val) {
      console.log(val);
      dispatch(
        SignActions.signUp({
          token: val.token,
          userId: val.theUser.userId,
          userImage: val.theUser.image,
          userName: val.theUser.userName,
          phone: val.theUser.phone,
        })
      );

      if (!ErrorMessage) {
        nameInput.current.value = "";
        emailInput.current.value = "";
        passwordInput.current.value = "";
      }

      history.push("/userpage");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userName = nameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const form = new FormData();
    form.append("userName", nameInput.current.value);
    form.append("email", emailInput.current.value);
    form.append("password", passwordInput.current.value);
    form.append("image", img);
    form.append("phone", phoneInput.current.value);

    console.log(img);

    sendRequest(
      {
        method: "POST",
        url: "http://localhost:8000/api/users/signup",
        data: form,
      },
      applyData
    );

    console.log(userName, password, email);
  };

  return (
    <div className="min-h-screen sm:flex debug-screens bg-gradient-to-r from-slate-700 via-blue-500 to-black">
      {isError && <ErrorModal />}

      <div className="lg:mt-24 sm:ml-5  sm:mt-32 lg:ml-8 md:ml-6 xl:w-[40%] lg:w-2/5 xl:my-auto md:w-[75%] md:mt-24">
        <img
          className="rounded-lg  w-0 h-0  sm:h-72 sm:w-72  md:h-72 md:w-[85%] lg:h-96 xl:h-[60%] lg:w-[90%] "
          src={img2}
          alt="pic"
        ></img>
      </div>
      <div className=" mt-10 w-[90%] h-auto  mx-auto sm:h-[75%]  sm:mb-1 lg:h-[80%] sm:mt-16  md:w-[95%] md:h-[80%] sm:w-[50%]  text-white rounded-lg shadow-2xl sm:ml-10  lg:w-[45%]  lg:mb-5 lg:ml-10 md:ml-1 border xl:mr-10 lg:mt-16  md:mr-8 xl:h-[90%] xl:my-auto xl:w-[45%]  md:mt-10 md:mb-7">
        <div className="py-3 text-center text-white lg:text-3xl lg:mt-4 sm:py-7 lg:py-4 md:text-2xl md:mt-1 md:text-green-500 lg:text-yellow-400 xl:text-red-400">
          {" "}
          Welcome To Sign Up Page
        </div>
        <div className="grid w-[60%] gap-3 mb-2 ml-10 md:mb-2 lg:gap-4">
          <div>
            <UserInputComp
              ref={nameInput}
              input={{
                type: "text",
                placeholder: "Full Name",
                className:
                  "px-3 lg:py-2 mt-1 py-0.5 rounded-lg  bg-transparent  border border-red-200 w-full md:py-1 text-gray-100",
              }}
            />
          </div>

          <div>
            <UserInputComp
              ref={emailInput}
              input={{
                type: "email",
                placeholder: "Email",
                className:
                  "px-3 lg:py-2 mt-1 py-0.5 rounded-lg  bg-transparent border border-red-200 w-full md:py-1 text-gray-100",
              }}
            />
          </div>

          <div>
            <UserInputComp
              ref={passwordInput}
              input={{
                type: "password",
                placeholder: "Password",
                className:
                  "px-3 lg:py-2 mt-1 py-0.5 rounded-lg  bg-transparent border border-red-200 w-full md:py-1 text-gray-100",
              }}
            />
          </div>

          <div>
            <UserInputComp
              ref={phoneInput}
              input={{
                type: "number",
                placeholder: "Phone ",
                className:
                  "px-3 lg:py-2 mt-1 py-0.5 rounded-lg  bg-transparent border border-red-200 w-full md:py-1 text-gray-100",
              }}
            />
          </div>
        </div>

        <ImageUploader
          onGetImage={getImage}
          cssClass="rounded-full w-20 h-20 sm:w-20 sm:h-20  md:w-24 md:h-24 lg:w-32  lg:h-32"
          img={img1}
        />

        <button
          onClick={submitHandler}
          type="submit"
          className="px-2 mb-5 ml-10 bg-blue-500 rounded-lg lg:text-base sm:text-sm sm:mb-2 hover:bg-blue-600 "
        >
          Sign Up
        </button>

        <Link
          className="ml-4 text-blue-400 sm:text-sm lg:text-lg hover:text-red-300"
          to="/forgotPassword"
        >
          Forgot Password ?
        </Link>
      </div>
    </div>
  );
};

export default UserSignUp;
