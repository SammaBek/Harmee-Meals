import { Fragment } from "react";
import { useSelector } from "react-redux";
const EditUserPage = (props) => {
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);

  console.log(isLoggedIn);
  return (
    <Fragment>
      <div className="grid h-auto ml-7 sm:ml-0 sm:w-[60%] sm:translate-y-5">
        <div className="flex w-full gap-3">
          <div className="grid gap-y-3 xl:gap-x-7 lg:gap-x-6 sm:gap-x-5">
            <label className="text-white transform translate-y-1 lg:text-base ">
              Name
            </label>
            <label className="text-white transform translate-y-1 lg:text-base">
              Phone
            </label>
            <label className="text-white transform translate-y-1 lg:text-base">
              Address
            </label>
          </div>

          <div className="grid w-full gap-y-3 xl:gap-x-7 lg:gap-x-6 sm:gap-x-5">
            <input
              className="h-8 p-1 text-white bg-transparent border border-gray-100 rounded-md w-[65%] sm:w-[75%] md:w-[70%] lg:text-base md:h-9"
              defaultValue={props.userName}
              ref={props.nameInput}
            />

            <input
              type="email"
              ref={props.emailInput}
              defaultValue={props.email}
              className="h-8 p-1 text-white bg-transparent border border-gray-100 rounded-md w-[65%] sm:w-[75%] md:w-[70%] lg:text-base md:h-9 "
            />

            <input
              type="email"
              ref={props.emailInput}
              defaultValue={props.email}
              className="h-8 p-1 text-white bg-transparent border border-gray-100 rounded-md w-[65%] sm:w-[75%] md:w-[70%] lg:text-base md:h-9 "
            />
          </div>
        </div>

        <div>
          <button
            onClick={props.saveHandler}
            className="absolute text-base mb-1 mt-2 lg:ml-20 xl:px-8 px-4 py-0.5  md:px-5 md:py-1  md:text-xl text-white bg-blue-500 border rounded-lg ml-10  hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUserPage;
