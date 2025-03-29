import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <>
      {!progress ? (
        <div className="flex flex-col gap-2">
          <div className="w-full bg-transparent rounded-full h-2 border border-richblack-100"></div>
          <span className="text-pink-100">Not Started</span>
        </div>
      ) : Number(progress) === 100 ? (
        <div className="flex flex-col gap-2">
          <div className="w-full bg-transparent rounded-full h-2">
            <div
              className="bg-caribbeangreen-100 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-caribbeangreen-100">Completed</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Custom Progress Bar */}
          <div className="w-full bg-transparent rounded-full h-2 border border-richblack-100">
            <div
              className="bg-[#4aedff] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[#4aedff]">{progress}% Completed</span>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
