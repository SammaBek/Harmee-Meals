import { useRef, Fragment, useContext, useState } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import { Link, useLocation } from "react-router-dom";
import useHttp from "../hooks/Use-Http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SignActions } from "../store/SignIn-slice";
import ImageUploader from "../utils/ImageUploader";
import img1 from "../img/img.webp";
import img2 from "../img/shop.webp";
import { ErrorAction } from "../store/Error-Slice";

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
  const addressInput = useRef();

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
          address: val.theUser.address,
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
    if (
      nameInput.current.value &&
      emailInput.current.value &&
      passwordInput.current.value &&
      img &&
      phoneInput.current.value
    ) {
      const userName = nameInput.current.value;
      const email = emailInput.current.value;
      const password = passwordInput.current.value;

      const form = new FormData();
      form.append("userName", nameInput.current.value);
      form.append("email", emailInput.current.value);
      form.append("password", passwordInput.current.value);
      form.append("image", img);
      form.append("phone", phoneInput.current.value);
      form.append("address", addressInput.current.value);

      console.log(img);

      sendRequest(
        {
          method: "POST",
          url: `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_BACKEND_URL
              : "http://localhost:8000/api"
          }/users/signup`,
          data: form,
        },
        applyData
      );

      console.log(userName, password, email);
    } else {
      dispatch(
        ErrorAction.setError({ errorMessage: "All fields must be filled!" })
      );
    }
  };

  return (
    <div className="min-h-screen sm:flex debug-screens ">
      {isError && <ErrorModal />}

      <div className="lg:mt-36 sm:ml-5  sm:mt-32 lg:ml-8 md:ml-6 xl:w-[40%] lg:w-2/5 xl:my-auto md:w-[75%] md:mt-32">
        <img
          className="rounded-lg object-fill  w-0 h-0  sm:h-72 sm:w-72  md:h-72 md:w-[85%] lg:h-96 xl:h-[60%] lg:w-[90%] "
          src={img2}
          alt="pic"
        ></img>
      </div>
      <div className=" mt-10 w-[90%] h-auto  mx-auto sm:h-[75%]  sm:mb-1 lg:h-[80%] sm:mt-16  md:w-[95%] md:h-[80%] sm:w-[60%]  text-white rounded-lg shadow-2xl sm:ml-5  lg:w-[45%]  lg:mb-5 lg:ml-10 md:ml-1  xl:mr-10 lg:mt-16  md:mr-8 xl:h-[90%] xl:my-auto xl:w-[45%]  md:mt-10 md:mb-7">
        <div className="py-3 font-mono text-lg font-bold text-center text-green-800 lg:text-3xl lg:mt-4 sm:py-7 lg:py-4 md:text-2xl md:mt-1 md:text-green-800 ">
          {" "}
          GABAA SIGN UP
        </div>
        <div className="grid w-full sm:w-[80%] gap-3 mb-2 ml-10 md:mb-2 lg:gap-4">
          <div>
            <input
              ref={nameInput}
              type="text"
              placeholder="Full Name"
              className=" border border-slate-400 bg-transparent text-slate-600 font-sans py-2.5 px-3 text-base  focus:ring-blue-slate-400 focus:outline focus:outline-slate-400   rounded-md w-[80%] sm:w-[90%] "
            />
          </div>

          <div>
            {/* <UserInputComp
              ref={emailInput}
              input={{
                type: "email",
                placeholder: "Email",
                className:
                  "px-3 lg:py-2 mt-1 py-0.5 rounded-lg  bg-transparent border border-red-200 w-full md:py-1 text-gray-100",
              }}
            /> */}
            <input
              ref={emailInput}
              type="text"
              placeholder="Email"
              className=" border border-slate-400 bg-transparent text-slate-600 font-sans py-2.5 px-3 text-base  focus:ring-blue-slate-400 focus:outline focus:outline-slate-400   rounded-md w-[80%] sm:w-[90%] "
              required
            />
          </div>

          <div>
            <input
              ref={passwordInput}
              type="password"
              placeholder="Password"
              className=" border border-slate-400 bg-transparent text-slate-600 font-sans py-2.5 px-3 text-base  focus:ring-blue-slate-400 focus:outline focus:outline-slate-400   rounded-md w-[80%] sm:w-[90%] "
              required
            />
          </div>

          <div>
            <input
              ref={phoneInput}
              type="number"
              placeholder="Phone"
              className=" border border-slate-400 bg-transparent text-slate-600 font-sans py-2.5 px-3 text-base  focus:ring-blue-slate-400 focus:outline focus:outline-slate-400   rounded-md w-[80%] sm:w-[90%]"
              required
            />
          </div>

          <div>
            <input
              ref={addressInput}
              type="text"
              placeholder="Address"
              className=" border border-slate-400 bg-transparent text-slate-600 font-sans py-2.5 px-3 text-base  focus:ring-blue-slate-400 focus:outline focus:outline-slate-400   rounded-md w-[80%] sm:w-[90%]"
              required
            />
          </div>
        </div>

        <ImageUploader
          onGetImage={getImage}
          cssClass="rounded-full mx-auto border-green-700 w-20 h-20 sm:w-20 sm:h-20  md:w-24 md:h-24 lg:w-32  lg:h-32"
          img={img1}
        />

        <button
          onClick={submitHandler}
          type="submit"
          className="px-5 py-1 mb-5 ml-10 font-mono bg-green-700 rounded-lg lg:text-base sm:text-sm sm:mb-2 hover:bg-blue-600 "
        >
          SIGN UP
        </button>

        <Link
          className="ml-4 text-green-700 sm:text-sm lg:text-lg hover:text-red-300"
          to="/forgotPassword"
        >
          Forgot Password ?
        </Link>
      </div>
    </div>
  );
};

export default UserSignUp;
