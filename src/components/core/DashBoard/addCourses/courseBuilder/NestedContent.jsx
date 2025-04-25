import React from "react";
import { FaCaretRight } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiMenuFold2Fill } from "react-icons/ri";

const NestedContent = () => {
  return (
    <div className="bg-richblack-700 px-6 pb-2 rounded-lg border border-richblack-500">
      <details className="group">
        <summary className="list-none cursor-pointer border-b border-richblack-500 text-richblack-300">
          <div className="flex justify-between items-center py-3">
            <div className="flex gap-1 items-center">
              <RiMenuFold2Fill />
              <span>Lesson 1</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center border-r border-richblack-300 pr-2">
                <MdEdit />
                <MdDelete />
              </div>
              <FaCaretRight className="group-open:rotate-90 transition-transform" />
            </div>
          </div>
        </summary>
        <p>
          Epcot is a theme park at Walt Disney World Resort featuring exciting
          attractions, international pavilions, award-winning fireworks and
          seasonal special events.
        </p>
      </details>
    </div>
  );
};

export default NestedContent;
