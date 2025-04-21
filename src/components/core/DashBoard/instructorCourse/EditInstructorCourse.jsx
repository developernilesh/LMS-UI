import React, { useEffect } from "react";
import endpoints from "../../../../services/apiEndpoints";
import { useParams } from "react-router-dom";
import { setLoading } from "../../../../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import {
  setCourse,
  setIsEditCourse,
} from "../../../../redux/slices/courseSlice";
import apiConnector from "../../../../services/apiConnector";
import Loader from "../../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "../addCourses/AddCourse";

const EditInstructorCourse = () => {
  const courseId = useParams().courseId;
  const dispatch = useDispatch();
  const { GET_SPECIFIC_COURSE_API } = endpoints;
  const { loading } = useSelector((state) => state.loader);

  const fetchSpecificCourse = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_SPECIFIC_COURSE_API + `/${courseId}`
      );
      if (response?.data?.success) {
        dispatch(setCourse(response.data.data));
        dispatch(setIsEditCourse(true));
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSpecificCourse();
  }, []);

  if (loading)
    return (
      <div className="fixed bottom-0 z-50">
        <Loader />
      </div>
    );

  return <AddCourse />;
};

export default EditInstructorCourse;
