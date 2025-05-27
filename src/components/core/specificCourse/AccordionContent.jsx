import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdKeyboardArrowDown, MdOndemandVideo } from "react-icons/md";

const AccordionContent = ({ content }) => {
  const [toggleSectionIndices, setToggleSectionIndices] = useState([]);
  const [toggleSubSectionIndices, setToggleSubSectionIndices] = useState({});

  const toggleSection = (index) => {
    setToggleSectionIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((item) => item !== index)
        : [...prevIndices, index]
    );
  };

  const toggleSubSection = (index, subIndex) => {
    const subSectionIndices = JSON.parse(
      JSON.stringify(toggleSubSectionIndices)
    );
    if (!Object.keys(subSectionIndices).includes(String(index))) {
      subSectionIndices[index] = [];
      subSectionIndices[index].push(subIndex);
    } else if (
      Object.keys(subSectionIndices).includes(String(index)) &&
      !subSectionIndices[index].includes(subIndex)
    ) {
      subSectionIndices[index].push(subIndex);
    }
    setToggleSubSectionIndices(subSectionIndices);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full mb-3">
        <div className="flex gap-3 text-richblack-200">
          <div>{content?.length}&nbsp;Sections</div>
          <div>&nbsp;&#8226;&nbsp;</div>
          <div>
            {content?.reduce((acc, curr) => acc + curr?.subSection?.length, 0)}
            &nbsp;Lectures
          </div>
        </div>
        <button
          className="text-sm font-medium text-yellow-25"
          onClick={() => setToggleSectionIndices([])}
        >
          Collapse all sections
        </button>
      </div>
      {content?.map((item, index) => (
        <div className="w-full" key={index}>
          <div
            className="bg-richblack-700 px-6 py-3 border border-richblack-500 flex justify-between text-richblack-50 cursor-pointer"
            onClick={() => toggleSection(index)}
          >
            <div className="flex gap-2 items-center">
              {toggleSectionIndices.includes(index) ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
              <span>{item?.sectionName}</span>
            </div>
            <div>{item?.subSection?.length}&nbsp;Lectures</div>
          </div>
          {toggleSectionIndices.includes(index) && (
            <div
              className={`px-6 py-3 border-x ${
                index + 1 === content?.length ? "border-b" : ""
              } border-richblack-500 flex flex-col gap-2`}
            >
              {item?.subSection?.map((subItem, subIndex) => (
                <div className="flex flex-col gap-2" key={subIndex}>
                  <div>
                    <div
                      className="flex justify-between items-center text-richblack-50"
                      onClick={() => toggleSubSection(index, subIndex)}
                    >
                      <div className="flex gap-2 items-center">
                        <MdOndemandVideo />
                        <div>{subItem?.title}</div>
                        <MdKeyboardArrowDown className="cursor-pointer" />
                      </div>
                      <div>
                        {convertTime(subItem?.SubSectionVideo?.duration)}
                      </div>
                    </div>
                    {Object.keys(toggleSubSectionIndices).includes(
                      String(index)
                    ) &&
                      toggleSubSectionIndices[index].includes(subIndex) && (
                        <div className="text-sm pl-6 pr-16 text-richblack-200">
                          {subItem?.description}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionContent;

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
