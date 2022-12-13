import { Fragment } from "react";
import { useSelector } from "react-redux";
import shopping13 from "../img/shopping13.jpeg";
const EditUserPage = (props) => {
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);

  console.log(isLoggedIn);
  return (
    <Fragment>
      <div className="flex">
        <div className="grid h-auto py-3 ml-7 sm:ml-7 sm:w-[60%] w-full  ">
          <div className="flex w-full gap-3">
            <div className="grid gap-y-3 xl:gap-x-7 lg:gap-x-6 sm:gap-x-5">
              <label className="p-1.5  text-slate-600 text-base">Name</label>
              <label className="p-1.5  text-slate-600 text-base">Phone</label>
              <label className="p-1.5  text-slate-600 text-base">Address</label>
            </div>

            <div className="grid w-full gap-y-3 xl:gap-x-7 lg:gap-x-6 sm:gap-x-5">
              <input
                className="h-8 p-1 text-slate-600 bg-transparent border border-slate-600 rounded-md w-[85%] sm:w-[100%] md:w-[95%] text-base md:h-9"
                defaultValue={props.userName}
                ref={props.nameInput}
                type="text"
              />

              <input
                type="number"
                ref={props.phoneInput}
                defaultValue={props.phone}
                className="h-8 p-1 text-slate-600 bg-transparent border border-slate-600 rounded-md w-[85%] sm:w-[100%] md:w-[95%] text-base md:h-9 "
              />

              <input
                type="text"
                ref={props.addressInput}
                defaultValue={props.address}
                className="h-8 p-1 text-slate-600 bg-transparent border border-slate-600 rounded-md w-[85%] sm:w-[100%] md:w-[95%] text-base md:h-9 "
              />
            </div>
          </div>

          <div>
            <button
              onClick={props.saveHandler}
              className=" text-base mb-1 mt-2 lg:ml-20 xl:px-8 px-4 py-0.5  md:px-5 md:py-1  md:text-xl text-white bg-blue-500 border rounded-lg ml-10  hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>

        <div className="hidden ml-5 sm:block w-[50%] h-40">
          <img
            className="object-bottom sm:h-40 w-[90%] rounded-xl"
            src={shopping13}
            alt="pic"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default EditUserPage;
