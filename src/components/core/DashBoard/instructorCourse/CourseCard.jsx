import React, { useState } from "react";
import SubmitButton from "../../../Form/SubmitButton";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [confirmationModalData, setConfirmationModalData] = useState(null);

  return (
    <>
      <div
        className="w-full max-w-sm border rounded-lg shadow-sm bg-richblack-800 border-richblack-700 hover:scale-[1.01] 
        transtion-all duration-200 ease-in-out cursor-pointer"
      >
        <div className="relative">
          <img
            src={course.thumbNail}
            alt={course.courseName}
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-2 right-2 bg-richblack-900 text-yellow-50 px-2 py-1 rounded">
            ₹{course.price}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg text-richblack-5 font-semibold">
            {course.courseName}
          </h3>
          <p className="text-richblack-200 mb-2 truncate">
            {course.courseDescription}
          </p>
          <div className="text-richblack-200 mb-2">
            Status:{" "}
            <span
              className={`text-sm ${
                course.status === "Published"
                  ? "bg-caribbeangreen-500"
                  : "bg-pink-600"
              } rounded-full px-2 text-white`}
            >
              {course.status}
            </span>
          </div>
          <p className="text-richblack-200 mb-2">
            Students Enrolled:&nbsp;
            <span className="text-richblack-50">
              {course.studentsEnrolled?.length || 0}
            </span>
          </p>
          <div className="flex flex-wrap gap-2 text-blue-100">
            {course.tags?.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
          <div className="flex justify-end items-center text-richblack-300 gap-2">
            <SubmitButton
              buttonContent="Edit"
              onClick={() =>
                navigate(`/dashboard/edit-instructor-course/${course._id}`)
              }
              buttonType="button"
              width="w-fit"
            />
            <SubmitButton
              buttonContent="Delete"
              onClick={() =>
                setConfirmationModalData({
                  text1: "Are you sure?",
                  text2: "Course can have enrolled students!",
                  btn1text: "Delete",
                  btn2text: "Cancel",
                  btn1handler: () => {
                    console.log(course._id);
                    setConfirmationModalData(null);
                  },
                  btn2handler: () => setConfirmationModalData(null),
                })
              }
              buttonType="button"
              width="w-fit"
              background="bg-pink-200"
              text="text-richblack-800"
            />
          </div>
        </div>
      </div>
      {confirmationModalData && (
        <ConfirmationModal modalData={confirmationModalData} />
      )}
    </>
  );
};

export default CourseCard;
