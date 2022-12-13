import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
  errorMessage: null,
  isError: false,
  pageTo: null,
};

const Error = createSlice({
  initialState: initialErrorState,
  name: "Error",
  reducers: {
    setError(state, action) {
      console.log(action.payload.errorMessage);
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
    },
    cancelError(state) {
      state.isError = false;
      state.errorMessage = null;
    },
    setPageTo(state, action) {
      console.log(action.payload.pageTo);
      state.pageTo = action.payload.pageTo;
    },
  },
});

export const ErrorAction = Error.actions;
export default Error.reducer;
