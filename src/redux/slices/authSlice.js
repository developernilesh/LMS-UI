import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenExpiresIn: localStorage.getItem("tokenExpiresIn")
    ? JSON.parse(localStorage.getItem("tokenExpiresIn"))
    : Date.now() - 100000,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenExpiresIn: (state, action) => {
      state.tokenExpiresIn = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
  },
});

export const { setSignupData, setTokenExpiresIn } = authSlice.actions;
export default authSlice.reducer;
