import { useRef, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ErrorAction } from "../store/Error-Slice";
import ErrorModal from "../modal/ErrorModal";

const NewPassword = () => {
  const history = useHistory();
  const { resetToken } = useParams();
  const password = useRef();
  const passwordConfirm = useRef();
  const [pass, setPass] = useState(false);
  const Dispatch = useDispatch();
  const isError = useSelector((state) => state.error.isError);

  const updatePassword = async (event) => {
    event.preventDefault();

    const newPassword = password.current.value;
    const confirmPassword = passwordConfirm.current.value;
    console.log(resetToken);

    if (password.current.value === passwordConfirm.current.value) {
      try {
        await axios({
          method: "PATCH",
          url: `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_BACKEND_URL
              : "http://localhost:8000/api"
          }/users/resetPassword/${resetToken}`,
          data: { password: newPassword },
        });

        history.push("/signin");
      } catch (err) {
        console.log(err);
      }
    } else {
      Dispatch(
        ErrorAction.setError({
          errorMessage: "Oops! The Passwords Don't Match",
        })
      );
    }
  };

  return (
    <div className="">
      {isError && <ErrorModal />}
      <form className="grid " onSubmit={updatePassword}>
        <div className="w-[90%] sm:w-[70%] md:w-[55%] lg:w-[40%] xl:w-[35%] mx-auto mt-20 border shadow-2xl h-72 sm:h-80 rounded-xl ">
          <div className="mt-4 text-2xl text-center text-gray-500 md:text-3xl">
            New Password
          </div>
          <div className="grid w-2/3 grid-flow-row mt-3 ml-5 ">
            <div>
              <label className="text-lg text-gray-500 sm:text-xl">
                Password
              </label>
            </div>
            <div className="mt-1 sm:mt-3 ">
              <input
                ref={password}
                className="w-full px-3 py-1 text-lg bg-transparent border rounded-md sm:py-2 sm:text-xl lg:text-2xl focus:border-red-50 "
                type="password"
              />
            </div>

            <div className="mt-3 ">
              <label className="text-lg text-gray-500 sm:text-xl ">
                Confirm Password
              </label>
            </div>
            <div className="mt-1 sm:mt-3 ">
              <input
                ref={passwordConfirm}
                className="w-full px-3 py-1 text-lg bg-transparent border rounded-md sm:py-2 sm:text-xl lg:text-2xl"
                type="password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`px-2 py-1 mt-5 ml-5 text-gray-100 bg-blue-500 rounded-md hover:bg-blue-600 
                
              `}
            >
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
