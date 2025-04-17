import React, { useEffect, useState } from "react";
import endpoints from "../../../../services/apiEndpoints";
import apiConnector from "../../../../services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../redux/slices/loaderSlice";

const ShowInstructorCourses = () => {
  const { VIEW_ALL_COURSES } = endpoints;
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [allCourses, setAllCourses] = useState([]);

  const fetchAllCourses = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", VIEW_ALL_COURSES);
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

  // if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl text-richblack-5 font-medium py-6">
          My Courses
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : allCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <div
                key={course._id}
                className="bg-richblack-800 rounded-lg overflow-hidden border border-richblack-700 hover:shadow-md hover:scale-[1.01] transition-all"
              >
                <div className="relative">
                  <img
                    src={course.thumbNail}
                    alt={course.courseName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-richblack-900 text-yellow-50 px-2 py-1 rounded text-sm">
                    ₹{course.price}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl text-richblack-5 font-medium">
                    {course.courseName}
                  </h3>
                  <p className="text-richblack-100 mb-2 truncate">
                    {course.courseDescription}
                  </p>
                  <div className="text-richblack-200 text-sm">
                    <p>
                      Students Enrolled:{" "}
                      <span className="text-richblack-50">
                        {course.studentsEnrolled?.length || 0}
                      </span>
                    </p>
                    <p>
                      No. of Reviews:{" "}
                      <span className="text-richblack-50">
                        {course.ratingAndReview?.length || 0}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end items-center text-richblack-300 text-sm gap-2">
                    <button className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-md text-sm">
                      Edit
                    </button>
                    <button className="bg-pink-200 text-richblack-900 px-3 py-1 rounded-md text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default ShowInstructorCourses;
