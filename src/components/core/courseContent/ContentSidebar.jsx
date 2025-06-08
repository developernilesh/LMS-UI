import React, { useState } from "react";
import SubmitButton from "../../Form/SubmitButton";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOndemandVideo,
} from "react-icons/md";

const ContentSidebar = ({ courseDetails, setVideoSource }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    if (openIndex === index) setOpenIndex(null);
    else setOpenIndex(index);
  };
  return (
    <div className="w-full md:w-[300px] bg-richblack-800 py-6 md:min-h-[calc(100vh-48px)] border-t md:border-t-0 md:border-r border-richblack-700 ">
      <div className="flex flex-row md:flex-col gap-3 items-start justify-between w-11/12 mx-auto border-b border-richblack-500 mb-3 pb-3">
        <h2 className="text-richblack-5 text-lg font-semibold">
          {courseDetails?.courseName}
        </h2>
        <SubmitButton
          buttonContent="Add Review"
          buttonType="button"
          width="w-fit"
        />
      </div>
      <div className="w-full flex flex-col gap-2 cursor-pointer">
        {courseDetails?.courseContent?.map((item, index) => (
          <div key={index}>
            <div
              className="bg-richblack-700 p-3 text-richblack-25 font-medium flex gap-2 justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <p>{item?.sectionName}</p>
              {openIndex === index ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </div>
            {openIndex === index &&
              item?.subSection?.map((subItem, subIndex) => (
                <div
                  className="border-t border-richblack-600 p-3 text-sm text-richblack-100 flex items-center gap-2"
                  key={subIndex}
                >
                  <p>{subItem.title}</p>
                  <MdOndemandVideo />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSidebar;
