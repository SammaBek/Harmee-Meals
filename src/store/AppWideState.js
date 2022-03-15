import Cookies from "js-cookie";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import signReducer from "./SignIn-slice";

const store = configureStore({ reducer: { sign: signReducer } });

export default store;
