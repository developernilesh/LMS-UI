import React, { useEffect } from "react";
import Loader from "../../../Loader/Loader";
import CourseForm from "./CourseForm";
import {
  setCourse,
  setIsEditCourse,
  setStep,
} from "../../../../redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const AddCourse = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(setCourse(null));
    dispatch(setIsEditCourse(false));
    dispatch(setStep(1));
  }, []);

  if (loading)
    return (
      <div className="fixed bottom-0 z-50">
        <Loader />
      </div>
    );
  return <CourseForm />;
};

export default AddCourse;
