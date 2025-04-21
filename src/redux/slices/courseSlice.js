import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 2,
  categories: [],
  course: null,
  isEditCourse: false,
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
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setIsEditCourse: (state, action) => {
      state.isEditCourse = action.payload;
    },
  },
});

export const { setStep, setCategories, setCourse, setIsEditCourse } = courseSlice.actions;
export default courseSlice.reducer;
