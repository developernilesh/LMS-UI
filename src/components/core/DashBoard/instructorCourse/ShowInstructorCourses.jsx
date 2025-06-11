import React, { useEffect, useState } from "react";
import endpoints from "../../../../services/apiEndpoints";
import apiConnector from "../../../../services/apiConnector";
import { useDispatch } from "react-redux";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SubmitButton from "../../../Form/SubmitButton";
import {
  setCourse,
  setIsEditCourse,
  setStep,
} from "../../../../redux/slices/courseSlice";

const ShowInstructorCourses = () => {
  const { VIEW_ENROLLED_COURSES_API } = endpoints;
  const dispatch = useDispatch();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", VIEW_ENROLLED_COURSES_API);
      if (response?.data?.success) {
        setAllCourses(response.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCourse(null));
    dispatch(setIsEditCourse(false));
    dispatch(setStep(1));
    fetchAllCourses();
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl text-richblack-5 font-medium py-6">My Courses</h2>
      {loading ? (
        <div className="w-full flex flex-wrap justify-center gap-6">
          {[...Array(2)].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      ) : allCourses.length > 0 ? (
        <div className="w-full flex flex-wrap justify-center gap-6">
          {allCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              fetchAllCourses={fetchAllCourses}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-2xl text-pink-200 mb-4">
            You haven't created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <SubmitButton
              buttonContent="Create Course"
              buttonType="button"
              width="w-fit"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowInstructorCourses;
