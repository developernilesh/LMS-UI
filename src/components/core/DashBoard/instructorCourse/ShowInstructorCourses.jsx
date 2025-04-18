import React, { useEffect, useState } from "react";
import endpoints from "../../../../services/apiEndpoints";
import apiConnector from "../../../../services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../redux/slices/loaderSlice";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";

const ShowInstructorCourses = () => {
  const { VIEW_ENROLLED_COURSES_API } = endpoints;
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [allCourses, setAllCourses] = useState([]);

  const fetchAllCourses = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", VIEW_ENROLLED_COURSES_API);
      if (response?.data?.success) {
        setAllCourses(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl text-richblack-5 font-medium py-6">
        My Courses
      </h2>
      {loading ? (
        <div className="w-full flex flex-wrap justify-center gap-6">
          {[...Array(2)].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      ) : allCourses.length > 0 ? (
        <div className="w-full flex flex-wrap justify-center gap-6">
          {allCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-2xl text-pink-200 mb-4">
            You haven't created any courses yet
          </p>
          <button className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md font-medium">
            Create a Course
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowInstructorCourses;
