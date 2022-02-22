import Cookies from "js-cookie";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialSignInState = {
  isLoggedIn: false,
  token: null,
  userId: null,
};

const Sign = createSlice({
  name: "signIn",
  initialState: initialSignInState,
  reducers: {
    signIn(state, action) {
      console.log(action);
      Cookies.set("token", action.payload.token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },

    signOut(state) {
      Cookies.remove("token");

      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
    signUp(state, action) {
      Cookies.set("token", action.payload.token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
});

const store = configureStore({ reducer: Sign.reducer });
export const SignActions = Sign.actions;

export default store;
