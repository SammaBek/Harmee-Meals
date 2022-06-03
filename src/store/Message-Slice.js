import { createSlice } from "@reduxjs/toolkit";
const initialMessageState = {
  showMessage: false,
  updateMessage: false,
  detailMessage: false,
};

const Message = createSlice({
  name: "Message",
  initialState: initialMessageState,
  reducers: {
    changeShowMessage(state) {
      state.showMessage = !state.showMessage;
    },
    updateMsg(state) {
      state.updateMessage = !state.updateMessage;
    },
    messageDetail(state) {
      state.detailMessage = !state.detailMessage;
    },
  },
});
export const MessageActions = Message.actions;

export default Message.reducer;
