import { Fragment, useState } from "react";
import shopping14 from "../img/shopping14.webp";
import { useSelector } from "react-redux";
const ResetPassword = (props) => {
  const [reveal, setReveal] = useState("password");
  const showMessage = useSelector((state) => state.message.showMessage);

  const handleReveal = () => {
    if (reveal === "password") {
      setReveal("text");
    } else {
      setReveal("password");
    }
  };

  return (
    <Fragment>
      <div className="flex">
        <div className="grid grid-flow-row sm:w-[60%] w-[90%] ml-6  sm:ml-8 h-36 sm:h-auto">
          <div className="grid grid-flow-row gap-2">
            <div className="grid grid-flow-row ">
              <div>
                <label className="text-base text-slate-600 md:text-base xl:text-lg ">
                  Current Password
                </label>
              </div>
              <div className="flex">
                <input
                  className="w-[72%] static sm:w-[80%] lg:px-6  px-2 py-4 text-sm text-slate-600  bg-transparent border border-slate-600 rounded-md lg:text-base lg:w-[80%] h-7 xl:h-9 xl:w-64"
                  ref={props.currPassInput}
                  type={reveal}
                  maxLength="15"
                />

                <div>
                  <svg
                    onClick={handleReveal}
                    xmlns="http://www.w3.org/2000/svg"
                    width="0"
                    height="0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-4 h-4 transform -translate-x-5 translate-y-2 text-slate-600 ${
                      showMessage ? "hidden" : "block"
                    }`}
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-flow-row">
              <div>
                <p className="text-base text-slate-600 md:text-base xl:text-lg ">
                  New Password
                </p>
              </div>
              <div className="flex ">
                <input
                  type={reveal}
                  ref={props.newPassInput}
                  maxLength="15"
                  className="  w-[72%]  sm:w-[80%] px-2 lg:px-6 py-4 text-sm text-slate-600  bg-transparent border border-slate-600 rounded-md lg:text-base lg:w-[80%] h-7 xl:h-9 xl:w-64 "
                />
                <div>
                  <svg
                    onClick={handleReveal}
                    xmlns="http://www.w3.org/2000/svg"
                    width="0"
                    height="0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-4 h-4 transform -translate-x-5 translate-y-2 text-slate-600 ${
                      showMessage ? "hidden" : "block"
                    } `}
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={props.saveHandler}
              className="px-3 py-0.5 mt-2 text-lg text-gray-200 bg-blue-500 border rounded-lg sm:text-xl sm:py-1 sm:px-6 hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>

        <div className="hidden ml-5 sm:block  w-[50%]">
          <img
            className="h-40 object-bottom w-[90%] rounded-xl"
            src={shopping14}
            alt="pic"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
