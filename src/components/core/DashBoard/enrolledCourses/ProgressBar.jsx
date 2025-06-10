import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProgressBar = ({totalLectures}) => {
  const [progress, setProgress] = useState(0)
  const {user} = useSelector(state => state.profile)

  useEffect(() => {
    if(user._id){
      const completedLectures = user.courseProgress.length
      const totalProgress = (completedLectures/totalLectures)*100
      setProgress(String(totalProgress).split(".").length === 2 ? totalProgress.toFixed(2) : totalProgress)
    }
  },[user])
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
