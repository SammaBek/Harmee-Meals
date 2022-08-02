import { createSlice } from "@reduxjs/toolkit";
const initialMessageState = {
  showMessage: false,
  updateMessage: false,
  detailMessage: false,
  numMessage: 0,
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
    setNumMessage(state, action) {
      state.numMessage = action.payload.numMessage;
    },
  },
});
export const MessageActions = Message.actions;

export default Message.reducer;
