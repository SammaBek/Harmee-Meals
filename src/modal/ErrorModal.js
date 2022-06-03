import react, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ErrorAction } from "../store/Error-Slice";

const ErrorModal = (props) => {
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const dispatch = useDispatch();
  const cancelHandler = () => {
    dispatch(ErrorAction.cancelError());
  };

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="grid w-2/5 grid-flow-row rounded-lg shadow-2xl bg-red-50 h-1/6 ">
        <h1 className="mt-5 ml-10 text-2xl text-center ">{errorMessage}</h1>
        <button
          onClick={cancelHandler}
          className="w-16 h-8 ml-10 bg-red-400 rounded-lg shadow-2xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
