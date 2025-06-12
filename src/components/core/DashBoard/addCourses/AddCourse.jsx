import React, { useEffect } from "react";
import Loader from "../../../Loader/Loader";
import CourseForm from "./CourseForm";
import {
  setCourse,
  setIsEditCourse,
  setStep,
} from "../../../../redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../../pages/Error";

const AddCourse = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(setCourse(null));
    dispatch(setIsEditCourse(false));
    dispatch(setStep(1));
  }, []);

  if (!user?._id || loading)
    return (
      <div className="fixed bottom-0 z-50">
        <Loader />
      </div>
    );
  return user?.accountType === "Instructor" ? (
    <CourseForm />
  ) : (
    <div className="text-2xl text-pink-500 text-center mt-16">
      Only Instructors Are Allowed to Add Any Course!
    </div>
  );
};

export default AddCourse;
