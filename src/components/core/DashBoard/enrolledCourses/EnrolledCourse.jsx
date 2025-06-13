import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import endpoints from "../../../../services/apiEndpoints";
import apiConnector from "../../../../services/apiConnector";
import toast from "react-hot-toast";
import CourseCardSkeleton from "./CourseCardSkeleton";
import { useSelector } from "react-redux";

const { VIEW_ENROLLED_COURSES_API } = endpoints;

const EnrolledCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState([]);
  const { user } = useSelector((state) => state.profile);

  const fetchEnrolledCourses = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", VIEW_ENROLLED_COURSES_API);
      if (response?.data?.success) {
        setEnrolledCourses(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (!user?._id || loading) {
    return (
      <div className="w-11/12">
        <h3 className="text-3xl text-richblack-5 font-medium py-3">
          Enrolled Courses
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12">
      {user?.accountType === "Student" ? (
        <>
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
        </>
      ) : (
        <div className="text-2xl text-pink-500 text-center mt-16">
          Only Students Are Allowed to Enroll to Any Course and See Their
          Enrolled Courses!
        </div>
      )}
    </div>
  );
};

export default EnrolledCourse;
