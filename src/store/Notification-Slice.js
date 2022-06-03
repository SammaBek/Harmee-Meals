import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialSignInState = {
  notificationNum: 0,

  message: null,
};

const notification = createSlice({
  name: "Notification",
  initialState: initialSignInState,
  reducers: {
    setNum(state, action) {
      state.notificationNum = action.payload.num;
    },
    addNum(state) {
      state.notificationNum = state.notificationNum + 1;
    },
    resetNum(state) {
      state.notificationNum = 0;
    },
    newMessage(state, action) {
      console.log(action);
      if (state.message) {
        state.message = [...state.message, action.payload.message];
      } else {
        state.message = [...action.payload.message];
      }
    },
    signOut(state) {
      state.notificationNum = 0;
      state.message = [];
    },
  },
});
export const NotificationActions = notification.actions;

export default notification.reducer;
