import React, { useEffect, useState } from "react";
import endpoints from "../../../../services/apiEndpoints";
import apiConnector from "../../../../services/apiConnector";

const ShowInstructorCourses = () => {
  const { VIEW_ALL_COURSES } = endpoints;
  const [isLoading, setIsLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]);

  const fetchAllCourses = async () => {
    setIsLoading(true);
    try {
      const response = await apiConnector("GET", VIEW_ALL_COURSES);
      if (response?.data?.success) {
        setAllCourses(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <div>
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl text-richblack-5 font-medium py-6">My Courses</h2>
      
      {allCourses.length > 0 ? (
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
                <h3 className="text-xl text-richblack-5 font-medium mb-2">{course.courseName}</h3>
                <div className="flex justify-between items-center text-richblack-300 text-sm">
                  <div>
                    <p>Students: {course.studentsEnrolled?.length || 0}</p>
                    <p>Reviews: {course.ratingAndReview?.length || 0}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-md text-sm">Edit</button>
                    <button className="bg-pink-200 text-richblack-900 px-3 py-1 rounded-md text-sm">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-2xl text-pink-200 mb-4">You haven't created any courses yet</p>
          <button className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md font-medium">
            Create a Course
          </button>
        </div>
      )}
    </div>

  </div>;
};

export default ShowInstructorCourses;
