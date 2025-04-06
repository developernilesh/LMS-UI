import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";
import profileSlice from "../slices/profileSLice";
import loaderSlice from "../slices/loaderSlice";
import courseSlice from "../slices/courseSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    profile: profileSlice,
    loader: loaderSlice,
    course: courseSlice,
  },
});

export default store;
