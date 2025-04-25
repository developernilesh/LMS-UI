import React, { useRef } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiMenuFold2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const NestedContent = ({ editSection }) => {
  const detailsRef = useRef(null);
  const { course } = useSelector((state) => state.course);

  const handleCaretClick = (e) => {
    e.preventDefault();
    if (detailsRef.current) {
      detailsRef.current.open = !detailsRef.current.open;
    }
  };

  return (
    <div className="bg-richblack-700 px-6 pb-2 rounded-lg border border-richblack-500 text-richblack-200">
      {course?.courseContent?.map((item) => (
        <details className="group" key={item._id}>
          <summary
            className="list-none cursor-pointer"
            // onClick={(e) => e.preventDefault()}
          >
            <div className="flex justify-between items-center py-3 border-b border-richblack-500">
              <div className="flex gap-1 items-center">
                <AiOutlineMenuUnfold />
                <span>{item.sectionName}</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center border-r border-richblack-300 pr-2">
                  <MdEdit
                    onClick={(e) => {
                      e.preventDefault();
                      editSection(item);
                    }}
                  />
                  <MdDelete />
                </div>
                <FaCaretDown
                  className="group-open:rotate-180 transition-transform cursor-pointer duration-300 ease-linear"
                  // onClick={handleCaretClick}
                />
              </div>
            </div>
          </summary>
          <div>
            {[1, 2, 3, 4].map((_, idx) => (
              <div
                className="flex justify-between items-center py-3 border-b border-richblack-500 pl-5"
                key={idx}
              >
                <div className="flex gap-1 items-center">
                  <RiMenuFold2Fill />
                  <span>Lesson 1</span>
                </div>
                <div className="flex gap-1 items-center">
                  {/* <div className="flex gap-1 items-center border-r border-richblack-300 pr-2"> */}
                  <MdEdit />
                  <MdDelete />
                  {/* </div> */}
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
};

export default NestedContent;
