import React from "react";

const ErrorContext = React.createContext({
  errorMessage: "Error Occured",
  isError: false,
  setErrorMessage: () => {},
  setIsError: () => {},
});

export default ErrorContext;
