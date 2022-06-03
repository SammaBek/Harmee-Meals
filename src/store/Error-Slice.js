import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
  errorMessage: null,
  isError: false,
};

const Error = createSlice({
  initialState: initialErrorState,
  name: "Error",
  reducers: {
    setError(state, action) {
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
    },
    cancelError(state) {
      state.isError = false;
      state.errorMessage = null;
    },
  },
});

export const ErrorAction = Error.actions;
export default Error.reducer;
