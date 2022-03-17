import { useRef, Fragment, useContext, useState } from "react";
import ErrorModal from "../modal/ErrorModal";
import UserInputComp from "./UserInputComp";
import ErrorContext from "../store/Error-Context";
import { Link, useLocation } from "react-router-dom";
import useHttp from "../hooks/Use-Http";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SignActions } from "../store/SignIn-slice";
import ImageUploader from "../utils/ImageUploader";
import img1 from "../img/img.jpeg";

const UserSignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [img, setImg] = useState();

  const { sendRequest } = useHttp();

  const errCtx = useContext(ErrorContext);

  const location = useLocation();
  console.log(location.pathname);

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

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
        })
      );

      if (errCtx.errorMessage === "") {
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
    <div className="flex bg-gradient-to-r from-cyan-300 via-blue-500 to-cyan-500">
      {errCtx.isError && <ErrorModal />}

      <div className="lg:mt-40 lg:ml-8 xl:w-1/2 lg:w-2/5 xl:mt-28 md:w-1/2 md:ml-4 md:mt-24">
        <h1 className="absolute text-blue-400 "> WELCOME TO HARMEE MEALS</h1>
        <img
          className="rounded-lg "
          src="https://i2.wp.com/www.alltherooms.com/blog/wp-content/uploads/2018/12/Feature-10-Ethiopian-Food-Dishes-You-Have-to-Try-By-AS-Food-studio.jpg?fit=1000%2C667&ssl=1"
          alt="pic"
        ></img>
      </div>
      <div className="h-auto text-white rounded-lg shadow-2xl lg:w-6/12 lg:mt-10 lg:mb-10 lg:ml-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 xl:mr-10 md:1/2 md:ml-5 md:mr-4 md:w-1/2 md:mt-10 md:mb-7">
        <h2 className="text-center text-white lg:text-3xl lg:mt-3 py-7 md:text-2xl md:mt-1 md:text-green-500 lg:text-yellow-400 xl:text-red-400">
          {" "}
          Welcome To Sign Up Page
        </h2>
        <div className="w-1/2 mb-4 ml-10 md:mb-2">
          <div>
            <label className="mt-2 lg:text-lg md:text-base">Name</label>
          </div>

          <div>
            <UserInputComp
              ref={nameInput}
              input={{
                type: "text",
                placeholder: "Name",
                className:
                  "px-3 lg:py-2 mt-1 rounded-lg  text-black bg-transparent  border-2 border-red-200 w-full md:py-0",
              }}
            />
          </div>

          <div>
            <label className="mt-2 text-lg md:text-base">Email</label>
          </div>

          <div>
            <UserInputComp
              ref={emailInput}
              input={{
                type: "email",
                placeholder: "Email",
                className:
                  "px-3 lg:py-2 mt-1 rounded-lg text-black bg-transparent border-2 border-red-200 w-full md:py-0",
              }}
            />
          </div>

          <div>
            <label className="mt-2 lg:text-lg md:text-base">Password</label>
          </div>

          <div>
            <UserInputComp
              ref={passwordInput}
              input={{
                type: "password",
                placeholder: "Password",
                className:
                  "px-3 lg:py-2 mt-1 rounded-lg  text-black  bg-transparent border-2 border-red-200 w-full md:py-0",
              }}
            />
          </div>
        </div>

        <ImageUploader
          onGetImage={getImage}
          cssClass="rounded-full w-36 h-36 md:w-24 md:h-24 lg:w-36 lg:h-36"
          img={img1}
        />

        <button
          onClick={submitHandler}
          type="submit"
          className="px-4 py-1 mb-10 ml-10 bg-blue-500 rounded-lg hover:bg-blue-600 "
        >
          Sign Up
        </button>

        <Link
          className="ml-4 text-blue-400 hover:text-red-300"
          to="/forgotPassword"
        >
          Forgot Password ?
        </Link>
      </div>
    </div>
  );
};

export default UserSignUp;
