import react, { useContext } from "react";
import ErrorContext from "../store/Error-Context";

const ErrorModal = (props) => {
  const ctx = useContext(ErrorContext);
  const cancelHandler = () => {
    ctx.setIsError();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="grid w-2/5 grid-flow-row rounded-lg shadow-2xl bg-red-50 h-1/6 ">
        <h1 className="mt-5 ml-10 text-2xl text-center ">{ctx.errorMessage}</h1>
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
