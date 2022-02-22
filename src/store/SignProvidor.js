import React, { useContext, useReducer } from "react";
import SignedContext from "./Sign-Context";

const defaultSigned = {
  isSignedIn: false,
  token: null,
  userId: null,
};
const signedReducer = (state, action) => {
  if (action.type === "SIGNIN") {
    localStorage.setItem("token", action.item.token);
    return {
      isSignedIn: true,
      token: action.item.token,
      userId: action.item.userId,
    };
  }

  if (action.type === "SIGNOUT") {
    return {
      isSignedIn: false,
      token: null,
      userId: null,
    };
  }

  return defaultSigned;
};

const SignProvidor = (props) => {
  const [signedState, dispatch] = useReducer(signedReducer, defaultSigned);

  const signInHandler = (token, userId) => {
    dispatch({ type: "SIGNIN", item: { token, userId } });
  };
  const signOutHandler = () => {
    dispatch({ type: "SIGNOUT" });
  };
  const signedContext = {
    isSignedIn: signedState.isSignedIn,
    login: signInHandler,
    logout: signOutHandler,
    token: signedState.token,
    userId: signedState.userId,
  };

  return (
    <SignedContext.Provider value={signedContext}>
      {props.children}
    </SignedContext.Provider>
  );
};

export default SignProvidor;
