import { Fragment } from "react";
import { useSelector } from "react-redux";
const EditUserPage = (props) => {
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);

  console.log(isLoggedIn);
  return (
    <Fragment>
      <div className="grid grid-flow-row translate-y-16 h-28">
        <div className="flex gap-x-3">
          <label className="text-gray-600 ">Name</label>
          <input
            className="w-40 border-2 border-blue-100 rounded-md h-7"
            defaultValue={props.userName}
            ref={props.nameInput}
          />
        </div>

        <div className="flex gap-x-3">
          <p className="text-gray-600 ">Email</p>
          <input
            type="email"
            ref={props.emailInput}
            defaultValue={props.email}
            className="w-40 border-2 border-blue-100 rounded-md h-7"
          />
        </div>
        <div>
          <button
            onClick={props.saveHandler}
            className="absolute w-20 h-8 text-xl text-white bg-blue-500 rounded-lg right-10 hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUserPage;
