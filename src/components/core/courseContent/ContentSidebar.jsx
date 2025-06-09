import React, { useState } from "react";
import SubmitButton from "../../Form/SubmitButton";
import {
  MdArrowCircleLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOndemandVideo,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ContentSidebar = ({ courseDetails, setLecture, lecture }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-[300px] bg-richblack-800 py-6 md:min-h-[calc(100vh-48px)] border-t md:border-t-0 md:border-r border-richblack-700 ">
      <div className="flex flex-col gap-3 w-11/12 mx-auto border-b border-richblack-500 mb-3 pb-3">
        <div className="flex gap-3 justify-between items-center">
          <MdArrowCircleLeft
            className="scale-[1.75] ml-1 cursor-pointer"
            onClick={() => navigate("/dashboard/enrolled-courses")}
          />
          <SubmitButton
            buttonContent="Add Review"
            buttonType="button"
            width="w-fit"
          />
        </div>
        <h2 className="text-richblack-5 text-lg font-semibold">
          {courseDetails?.courseName}
        </h2>
      </div>
      <div className="w-full flex flex-col gap-2 cursor-pointer">
        {courseDetails?.courseContent?.map((item, index) => (
          <div key={index}>
            <div
              className="bg-richblack-700 py-3 text-richblack-25 font-medium"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="w-11/12 mx-auto flex gap-2 justify-between items-center">
                <p>{item?.sectionName}</p>
                {openIndex === index ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </div>
            </div>
            {openIndex === index &&
              item?.subSection?.map((subItem, subIndex) => (
                <div
                  className={`border-t border-richblack-600 py-3 text-sm ${
                    lecture?._id === subItem._id
                      ? "bg-yellow-700 text-yellow-5"
                      : "text-richblack-100"
                  }`}
                  key={subIndex}
                  onClick={() => setLecture(subItem)}
                >
                  <div className="w-11/12 mx-auto flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <input 
                        type="checkbox"
                        className="w-4 h-4 rounded border-richblack-300 bg-richblack-700 text-yellow-25 focus:ring-yellow-25 focus:ring-offset-richblack-700 cursor-pointer"
                      />
                      <p>{subItem.title}</p>
                      <MdOndemandVideo className="text-richblack-300" />
                    </div>
                    <div>{convertTime(subItem?.SubSectionVideo?.duration)}</div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSidebar;

function convertTime(durationInSeconds) {
  const totalHours = Math.floor(durationInSeconds / 3600);
  const totalMinutes = Math.floor((durationInSeconds % 3600) / 60);
  const totalSeconds = Math.round(durationInSeconds % 60);

  const hours = totalHours
    ? totalHours < 10
      ? `0${totalHours}:`
      : `${totalHours}:`
    : "";
  const minutes = totalMinutes
    ? totalMinutes < 10
      ? `0${totalMinutes}`
      : totalMinutes
    : "00";
  const seconds = totalSeconds
    ? totalSeconds < 10
      ? `0${totalSeconds}`
      : totalSeconds
    : "00";

  return `${hours}${minutes}:${seconds}`;
}
