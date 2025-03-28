import React from "react";
import { HiDotsVertical } from "react-icons/hi";

const courses = [
  {
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The complete python",
    description: "Short description",
    duration: "2hrs 30mins",
    progress: "50%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The complete python",
    description: "Short description",
    duration: "2hrs 30mins",
    progress: "50%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The complete python",
    description: "Short description",
    duration: "2hrs 30mins",
    progress: "50%",
  },
];

const EnrolledCourse = () => {
  return (
    <div className="w-11/12">
      <h3 className="text-3xl text-richblack-5 font-medium py-3">
        Enrolled Courses
      </h3>
      <div className="flex justify-between bg-richblack-700 rounded-t-md">
        <div className="w-[35%] p-4">Course</div>
        <div className="w-[15%] p-4 border-l border-richblack-500">
          Duration
        </div>
        <div className="w-[35%] p-4 border-l border-richblack-500">
          Course Progress
        </div>
        <div className="w-[10%] p-4 border-l border-richblack-500">Actions</div>
      </div>
      {courses.map((item, index) => (
        <div
          className="flex justify-between border border-t-0 border-richblack-700"
          key={index}
        >
          <div className="w-[35%] p-4 flex gap-5">
            <img
              src={item.image}
              alt={item.title}
              className="w-14 h-14 rounded-md"
            />
            <div className="flex flex-col justify-between items-start">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
          <div className="w-[15%] p-4 border-l border-richblack-700 flex items-center">
            {item.duration}
          </div>
          <div className="w-[35%] p-4 border-l border-richblack-700 flex items-center">
            {item.progress}
          </div>
          <div className="w-[10%] p-4 border-l border-richblack-700 flex items-center justify-center">
            <HiDotsVertical />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrolledCourse;
