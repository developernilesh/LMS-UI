import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

const steps = [
  { id: 1, step: "Course Information" },
  { id: 2, step: "Course Builder" },
  { id: 3, step: "Publish Course" },
];

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);
    // const step = 2;
  return (
    <div className="flex flex-col justify-center items-center gap-1 my-7">
      <div className="flex">
        {steps.map((item) => (
          <div key={item.id} className="flex-col items-center justify-center">
            <div className="flex items-center">
              <div
                className={`h-9 w-9 flex justify-center items-center text-lg font-semibold border rounded-full ${
                  item.id === step || item.id < step
                    ? "text-yellow-50 bg-yellow-800 border-yellow-50"
                    : "text-richblack-200 bg-richblack-800 border-richblack-700"
                }`}
              >
                {item.id < step ? (
                  <IoCheckmarkCircle className="h-full w-full" />
                ) : (
                  item.id
                )}
              </div>
              {item.id < steps.length && (
                <span
                  className={`${
                    item.id < step ? "text-yellow-50" : "text-richblack-200"
                  }`}
                >
                  - - - - - - - - - - - - - -
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-20">
        {steps.map((item) => (
          <div className="text-sm text-richblack-200 -ml-3">{item.step}</div>
        ))}
      </div>
    </div>
  );
};

export default RenderSteps;
