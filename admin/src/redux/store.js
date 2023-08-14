import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authRedux";
import productReducer from "./productRedux";
import userReducer from "./userRedux";
import orderReducer from "./orderRedux";
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
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    order: orderReducer,
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
