import { Fragment } from "react";
import { useSelector } from "react-redux";
const EditUserPage = (props) => {
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);

  console.log(isLoggedIn);
  return (
    <Fragment>
      <div className="grid h-auto grid-flow-row translate-y-6">
        <div className="flex gap-x-4 xl:gap-x-7 lg:gap-x-6 sm:gap-x-5">
          <label className="text-white transform translate-y-1 lg:text-base ">
            Name
          </label>
          <input
            className="h-8 p-1 ml-1 text-white bg-transparent border border-gray-100 rounded-md w-36 sm:w-52 md:w-56 lg:text-base md:h-9"
            defaultValue={props.userName}
            ref={props.nameInput}
          />
        </div>

        <div className="flex gap-x-4 xl:gap-x-7 lg:gap-x-6 sm:gap-x-5">
          <p className="text-white transform translate-y-1 lg:text-base">
            Phone
          </p>
          <input
            type="email"
            ref={props.emailInput}
            defaultValue={props.email}
            className="h-8 p-1 ml-0.5 text-white bg-transparent border border-gray-100 rounded-md w-36 sm:w-52 md:w-56 lg:text-base md:h-9 "
          />
        </div>

        <div className="flex gap-x-2 sm:gap-x-3 xl:gap-x-4">
          <p className="text-white transform translate-y-1 lg:text-base">
            Address
          </p>
          <input
            type="email"
            ref={props.emailInput}
            defaultValue={props.email}
            className="h-8 p-1 text-white bg-transparent border border-gray-100 rounded-md sm:ml-0 w-36 sm:w-52 md:w-56 lg:text-base md:h-9 "
          />
        </div>

        <div>
          <button
            onClick={props.saveHandler}
            className="absolute  lg:ml-20 xl:px-8 px-4 py-0.5 text-lg md:px-5 md:py-1  md:text-xl text-white bg-blue-500 border rounded-lg ml-10  hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUserPage;
