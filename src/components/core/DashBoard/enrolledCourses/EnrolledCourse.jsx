import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import endpoints from "../../../../services/apiEndpoints";
import { setLoading } from "../../../../redux/slices/loaderSlice";
import { useDispatch } from "react-redux";
import apiConnector from "../../../../services/apiConnector";
import toast from "react-hot-toast";

const { VIEW_ENROLLED_COURSES_API } = endpoints;

const EnrolledCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const dispatch = useDispatch();

  const fetchEnrolledCourses = async () => {
    try {
      const response = await apiConnector("GET", VIEW_ENROLLED_COURSES_API);
      if (response?.data?.success) {
        setEnrolledCourses(response?.data?.data);
        toast.success(response?.data?.message);
      }
      console.log("res", response);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="w-11/12">
      <h3 className="text-3xl text-richblack-5 font-medium py-3">
        Enrolled Courses
      </h3>
      {enrolledCourses.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {enrolledCourses.map((item, index) => (
            <CourseCard course={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-2xl pt-10 text-center text-pink-200">
          You are not enrolled to any course!
        </div>
      )}
    </div>
  );
};

export default EnrolledCourse;
