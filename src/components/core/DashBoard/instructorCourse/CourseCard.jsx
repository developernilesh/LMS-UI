import React, { useEffect, useState } from "react";
import SubmitButton from "../../../Form/SubmitButton";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";
import apiConnector from "../../../../services/apiConnector";
import endpoints from "../../../../services/apiEndpoints";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { handleError } from "../../../../services/operations/handleError";
import { useDispatch } from "react-redux";

const { DELETE_COURSE_API } = endpoints;

const CourseCard = ({ course, fetchAllCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModalData, setConfirmationModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    course.ratingAndReview?.length >= 1 &&
      setAvgRating(
        course.ratingAndReview?.reduce((acc, curr) => acc + curr.rating, 0) /
          course.ratingAndReview?.length
      );
  }, []);

  const deleteCourse = async (courseId) => {
    try {
      setLoading(true);
      const response = await apiConnector("DELETE", DELETE_COURSE_API, {
        courseId,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        setConfirmationModalData(null);
        fetchAllCourses();
      }
    } catch (error) {
      dispatch(handleError(navigate, error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full max-w-sm border rounded-lg shadow-sm bg-richblack-800 border-richblack-700 hover:scale-[1.01] 
        transtion-all duration-200 ease-in-out"
      >
        <div className="relative">
          <img
            src={course.thumbNail?.secure_url}
            alt={course.courseName}
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-2 right-2 bg-richblack-900 text-yellow-50 px-2 py-1 rounded">
            ₹{course.price}
          </div>
        </div>

        <div className="flex flex-col px-4 pt-4">
          <div className="min-h-[88px]">
            <h3 className="text-lg text-richblack-5 font-semibold line-clamp-2 overflow-hidden">
              {course.courseName}
            </h3>
            <p className="text-richblack-200 truncate">
              {course.courseDescription}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-wrap gap-2">
              <div className="text-richblack-200">
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
              <p className="text-richblack-200">
                Created:&nbsp;
                <span className="text-richblack-50">
                  {formatDateTime(course.createdAt)?.date || ""},&nbsp;
                  {formatDateTime(course.createdAt)?.time || ""}
                </span>
              </p>
            </div>
            <p className="text-richblack-200">
              Students Enrolled:&nbsp;
              <span className="text-richblack-50">
                {course.studentsEnrolled?.length || 0}
              </span>
            </p>
            <div className="flex gap-2 items-center">
              <div className="text-yellow-100">{avgRating}</div>
              <StarRatings
                rating={avgRating}
                starDimension="16px"
                starSpacing="2px"
                starRatedColor="#E7C009"
                starEmptyColor="#424854"
                // changeRating={changeRating}
                numberOfStars={5}
                name="rating"
              />
              <div className="text-richblack-300">
                ({course.ratingAndReview?.length}{" "}
                {course.ratingAndReview?.length > 1 ? "reviews" : "review"})
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center text-richblack-300 gap-2 px-4 py-3">
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
                btn1text: loading ? "Deleting..." : "Delete",
                btn2text: "Cancel",
                buttonDisbaled: loading ? true : false,
                btn1handler: () => deleteCourse(course._id),
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
      {confirmationModalData && (
        <ConfirmationModal modalData={confirmationModalData} />
      )}
    </>
  );
};

export default CourseCard;

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  // Format date as dd-mm-yy
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear().toString().substr(-2)}`;

  // Format time as am/pm
  let hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight
  const formattedTime = `${hours.toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
