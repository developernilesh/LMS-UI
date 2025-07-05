import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  tokenExpiresIn: localStorage.getItem("tokenExpiresIn") ? JSON.parse(localStorage.getItem("tokenExpiresIn")) : Date.now() - 100000,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTokenExpiresIn: (state, action) => {
      state.tokenExpiresIn = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
  },
});

export const { setSignupData, setToken, setTokenExpiresIn } = authSlice.actions;
export default authSlice.reducer;
