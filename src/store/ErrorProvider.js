import react, { useReducer } from "react";
import ErrorContext from "./Error-Context";
const defaultError = {
  errorMessage: "",
  isError: false,
};
const ErrorReducer = (state, action) => {
  if (action.type === "ERRMSG") {
    return {
      errorMessage: action.msg,
      isError: true,
    };
  }
  if (action.type === "CANCEl") {
    return {
      isError: false,
    };
  }
  return defaultError;
};
const ErrorProvider = (props) => {
  const [errorState, dispatch] = useReducer(ErrorReducer, defaultError);

  const errorMessageHandler = (errMsg) => {
    dispatch({ type: "ERRMSG", msg: errMsg });
  };
  const isErrorHandler = () => {
    dispatch({ type: "CANCEL" });
  };

  const errorContext = {
    errorMessage: errorState.errorMessage,
    isError: errorState.isError,
    setErrorMessage: errorMessageHandler,
    setIsError: isErrorHandler,
  };

  return (
    <ErrorContext.Provider value={errorContext}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
