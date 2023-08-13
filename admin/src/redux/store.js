import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
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
import logger from "redux-logger";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from 'history'

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    product: productReducer,
  });

export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([logger]),
});

export let persistor = persistStore(store);
