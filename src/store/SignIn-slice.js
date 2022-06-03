import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialSignInState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  userImage: null,
  userName: null,
  userEmail: null,
  prodId: null,
  show: false,
  searched: null,
};

const Sign = createSlice({
  name: "signIn",
  initialState: initialSignInState,
  reducers: {
    signIn(state, action) {
      console.log(action);

      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.userImage = action.payload.userImage;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },

    signOut(state) {
      Cookies.remove("token");

      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.userImage = null;
      state.userName = null;
      state.userEmail = null;
      state.updateMessage = false;
      state.showMessage = false;
      state.searched = null;
    },
    signUp(state, action) {
      Cookies.set("token", action.payload.token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.userImage = action.payload.userImage;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
    setBid(state, action) {
      state.prodId = action.payload.prodId;
    },
    setShow(state, action) {
      state.show = action.payload.show;
    },

    setSearched(state, action) {
      state.searched = action.payload.search;
    },
  },
});
export const SignActions = Sign.actions;

export default Sign.reducer;
