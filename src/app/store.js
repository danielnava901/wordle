import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import wordleReducer from "../features/wordle/wordleSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";

const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart", "wordle"],
};

let rootReducer = combineReducers({
  cart: cartReducer,
  wordle: wordleReducer,
});

const persistCartReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistCartReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
