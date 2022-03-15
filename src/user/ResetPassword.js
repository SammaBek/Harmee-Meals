import { Fragment } from "react";
const ResetPassword = (props) => {
  return (
    <Fragment>
      <div className="grid grid-flow-row translate-y-16 h-28">
        <div className="grid grid-flow-row ">
          <div>
            <label className="text-blue-400 ">Current Password</label>
          </div>
          <div>
            <input
              className="w-full px-3 py-4 border-2 border-blue-100 rounded-md h-7"
              ref={props.currPassInput}
              type="password"
            />
          </div>
        </div>

        <div className="grid grid-flow-row">
          <div>
            <p className="text-blue-400 ">New Password</p>
          </div>
          <div>
            <input
              type="password"
              ref={props.newPassInput}
              className="w-full px-3 py-4 border-2 border-blue-100 rounded-md h-7"
            />
          </div>
        </div>
        <div>
          <button
            onClick={props.saveHandler}
            className="absolute w-20 h-8 mt-5 text-xl text-white bg-blue-500 rounded-lg right-10 hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
