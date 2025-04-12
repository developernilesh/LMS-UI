import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  categories: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setStep, setCategories } = courseSlice.actions;
export default courseSlice.reducer;
