import React from "react";

const SignedContext = React.createContext({
  isSignedIn: false,
  token: null,
  userId: null,
  login: () => {},
  //setIsLoggen in
  logout: () => {},
});

export default SignedContext;
