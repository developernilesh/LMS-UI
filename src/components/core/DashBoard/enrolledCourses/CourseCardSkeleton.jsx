import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm border rounded-lg shadow-sm bg-richblack-800 border-richblack-700 animate-pulse">
      <div className="h-56 w-full bg-richblack-700 rounded-t-lg"></div>
      <div className="p-5 flex flex-col gap-3">
        <div className="space-y-2">
          <div className="h-6 bg-richblack-700 rounded-md"></div>
          <div className="h-4 bg-richblack-700 rounded-md w-3/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-richblack-700 rounded-full"></div>
          <div className="h-4 bg-richblack-700 rounded-md w-1/3"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-richblack-700 rounded-md w-1/2"></div>
          <div className="h-10 bg-richblack-700 rounded-md w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
