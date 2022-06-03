import { useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
const NewPassword = () => {
  const history = useHistory();
  const { resetToken } = useParams();
  const password = useRef();
  const passwordConfirm = useRef();

  const updatePassword = async (event) => {
    event.preventDefault();

    const newPassword = password.current.value;
    const confirmPassword = passwordConfirm.current.value;
    console.log(resetToken);
    try {
      await axios({
        method: "PATCH",
        url: `http://localhost:8000/api/users/resetPassword/${resetToken}`,
        data: { password: newPassword },
      });

      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <form className="grid " onSubmit={updatePassword}>
        <div className="w-2/5 mx-auto mt-20 border shadow-2xl h-96 rounded-xl ">
          <div className="mt-6 text-4xl text-center text-gray-500">
            New Password
          </div>
          <div className="grid w-2/3 grid-flow-row mt-6 ml-5">
            <div>
              <label className="text-xl text-gray-500">Password</label>
            </div>
            <div className="mt-3 ">
              <input
                ref={password}
                className="w-full px-3 py-2 text-xl bg-transparent border rounded-md focus:border-red-50 "
                type="password"
              />
            </div>

            <div className="mt-3 ">
              <label className="text-xl text-gray-500 ">Confirm Password</label>
            </div>
            <div className="mt-3 ">
              <input
                ref={passwordConfirm}
                className="w-full px-3 py-2 text-xl bg-transparent border rounded-md"
                type="password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="px-2 py-1 mt-5 ml-5 text-gray-100 bg-blue-500 rounded-md hover:bg-blue-600"
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
