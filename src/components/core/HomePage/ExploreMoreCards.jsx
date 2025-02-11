import React from "react";
import { IoPeople } from "react-icons/io5";
import { TbBinaryTree2Filled } from "react-icons/tb";

const ExploreMoreCards = ({ dark, data }) => {
  return (
    <div
      className={`w-[341.33px] ${dark
        ? "bg-richblack-800 text-richblack-5"
        : "bg-white text-richblack-800 shadow-[10px_10px_0_0_rgba(255,214,10,1)]"
        }`}
    >
      <div
        className={`min-h-[244px] px-6 pt-8 flex flex-col items-start gap-3 border-b-[1.5px] border-dashed ${dark
          ? "border-richblack-300" : "border-richblack-500"
          }`}
      >
        <h4 className="text-xl font-semibold">{data.heading}</h4>
        <p className="text-richblack-500">{data.description}</p>
      </div>
      <div
        className={`px-6 py-4 flex justify-between ${dark ? "text-richblack-300" : "text-blue-300"
          }`}
      >
        <div className="flex gap-2 items-center">
          <IoPeople className="w-5" />
          <span className="text-base font-medium">{data.level}</span>
        </div>
        <div className="flex gap-2 items-center">
          <TbBinaryTree2Filled className="w-5" />
          <span className="text-base font-medium">
            {data.lessonNumber} Lessons
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreCards;
