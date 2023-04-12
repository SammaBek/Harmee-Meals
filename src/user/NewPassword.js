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
        console.log(err.response.data.message);
        Dispatch(
          ErrorAction.setError({
            errorMessage: err.response.data.message,
          })
        );
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
        <div className="w-[90%] sm:w-[65%] md:w-[55%] md:p-4 p-4 lg:w-[45%] xl:w-[40%] mx-auto mt-20 border shadow-2xl h-auto  rounded-xl lg:p-6">
          <div className="mt-2 text-2xl text-center text-gray-500 md:text-3xl">
            New Password
          </div>
          <div className="grid w-[90%] mx-auto grid-flow-row gap-2  mt-2 ">
            {/* <div>
              <label className="text-lg text-gray-500 sm:text-xl">
                Password
              </label>
            </div> */}
            <div className=" sm:mt-2">
              <input
                ref={password}
                className="sm:w-[85%] w-[90%] mx-auto flex px-3 py-1.5 text-base bg-transparent border rounded-md sm:py-2 sm:text-lg focus:border-red-50 "
                type="password"
                placeholder="Password"
              />
            </div>

            {/* <div className="mt-2 ">
              <label className="text-lg text-gray-500 sm:text-xl ">
                Confirm Password
              </label>
            </div> */}
            <div className="mt-1 sm:mt-2 ">
              <input
                ref={passwordConfirm}
                className="sm:w-[85%] w-[90%] flex mx-auto px-3 py-1.5 text-base bg-transparent border rounded-md sm:py-2 sm:text-lg "
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="flex mx-auto ">
            <button
              type="submit"
              className={`px-2 mx-auto md:py-2 md:px-4  py-1.5 mt-4 md:mt-7  text-gray-100 bg-blue-500 rounded-md hover:bg-blue-600 
                
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
