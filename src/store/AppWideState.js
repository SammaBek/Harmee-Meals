import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import Cookies from "js-cookie";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import signReducer from "./SignIn-slice";
import messageReducer from "./Message-Slice";
import NotificationReducer from "./Notification-Slice";
import ErrorReducer from "../store/Error-Slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistNotfConfig = {
  key: "Notf",
  version: 1,
  storage,
};

const persistErrorConfig = {
  key: "error",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, signReducer);
const persistedReducerNotf = persistReducer(
  persistNotfConfig,
  NotificationReducer
);

const persistedReducerError = persistReducer(persistErrorConfig, ErrorReducer);

export const store = configureStore({
  reducer: {
    sign: persistedReducer,
    notf: persistedReducerNotf,
    error: persistedReducerError,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
