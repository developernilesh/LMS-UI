import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm border rounded-lg shadow-sm bg-richblack-800 border-richblack-700">
      <div className="relative">
        <div className="w-full h-56 bg-richblack-700 animate-pulse rounded-t-lg" />
      </div>

      <div className="p-4">
        <div className="h-6 bg-richblack-700 animate-pulse rounded w-3/4 mb-2" />
        <div className="h-4 bg-richblack-700 animate-pulse rounded w-full mb-2" />
        <div className="h-4 bg-richblack-700 animate-pulse rounded w-2/3 mb-2" />
        
        <div className="flex justify-between mb-2">
          <div className="h-4 bg-richblack-700 animate-pulse rounded w-1/3" />
          <div className="h-4 bg-richblack-700 animate-pulse rounded w-1/3" />
        </div>
        
        <div className="flex justify-end items-center gap-2">
          <div className="h-8 bg-richblack-700 animate-pulse rounded w-16" />
          <div className="h-8 bg-richblack-700 animate-pulse rounded w-16" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton; 