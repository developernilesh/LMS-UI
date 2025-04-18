import React from "react";

const CourseCard = ({ course, key }) => {
  return (
    <div
      key={key}
      className="w-full max-w-sm border rounded-lg shadow-sm bg-richblack-800 border-richblack-700 hover:scale-[1.01] 
    transtion-all duration-200 ease-in-out cursor-pointer"
    >
      <div className="relative">
        <img
          src={course.thumbNail}
          alt={course.courseName}
          className="w-full h-56 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-2 right-2 bg-richblack-900 text-yellow-50 px-2 py-1 rounded text-sm">
          ₹{course.price}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg text-richblack-5 font-semibold">
          {course.courseName}
        </h3>
        <p className="text-richblack-100 mb-2 truncate">
          {course.courseDescription}
        </p>
        <div className="text-richblack-200 text-sm flex justify-between mb-2">
          <p>
            Students Enrolled:&nbsp;
            <span className="text-richblack-50">
              {course.studentsEnrolled?.length || 0}
            </span>
          </p>
          <p>
            No. of Reviews:&nbsp;
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
  );
};

export default CourseCard;
