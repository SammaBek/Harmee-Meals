import react, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ErrorAction } from "../store/Error-Slice";
import UsePageToCounter from "../hooks/Use-PageToCounter";

const ErrorModal = (props) => {
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const pageTo = useSelector((state) => state.error.pageTo);
  const dispatch = useDispatch();
  const history = useHistory();
  const { startCounter } = UsePageToCounter();

  const cancelHandler = () => {
    dispatch(ErrorAction.cancelError());
    if (!pageTo) {
    } else {
      startCounter();
      history.push(`/${pageTo}`);
    }
  };
  console.log(errorMessage);
  return (
    <div className="fixed inset-0 top-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="grid w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%] grid-flow-row mx-auto rounded-lg shadow-2xl bg-gray-50 h-48 ">
        <div className="flex mx-auto my-auto ">
          <h1 className="mt-5 text-xl text-center text-gray-600 ">
            {errorMessage}
          </h1>
        </div>

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
