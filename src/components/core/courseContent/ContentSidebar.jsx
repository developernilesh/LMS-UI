import React, { useEffect, useState } from "react";
import SubmitButton from "../../Form/SubmitButton";
import {
  MdArrowCircleLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOndemandVideo,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loaderSlice";
import apiConnector from "../../../services/apiConnector";
import endpoints from "../../../services/apiEndpoints";
import { setUser } from "../../../redux/slices/profileSLice";
import AddReviewModal from "./AddReviewModal";
import { handleError } from "../../../services/operations/handleError";

const { MARK_UNMARK_LECTURE_API, USER_DETAILS_API } = endpoints;

const ContentSidebar = ({ courseDetails, setLecture, lecture }) => {
  const [totalCompletedLecturesArray, setTotalCompletedLecturesArray] =
    useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [openReviewModal, setopenReviewModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const fetchUserDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (response?.data?.success) {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      dispatch(handleError(navigate, error, false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleMarkUnmark = async (lectureId) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", MARK_UNMARK_LECTURE_API, {
        subSectionId: lectureId,
      }, {
        Authorization: `Bearer ${token}`,
      });
      if (response?.data?.success) {
        fetchUserDetails();
      }
    } catch (error) {
      dispatch(handleError(navigate, error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setOpenIndex(null);
    setLecture(null);
    if (!user || courseDetails.courseContent.length === 0) return;
    const completedLectures = [];
    courseDetails?.courseContent.forEach((section) => {
      section.subSection.forEach((subSection) => {
        if (user.courseProgress?.includes(subSection?._id)) {
          completedLectures.push(subSection._id);
        }
      });
    });
    if (completedLectures?.length > 0) {
      setTotalCompletedLecturesArray(completedLectures);
      const lastCompletedLecture =
        completedLectures[completedLectures.length - 1];
      courseDetails.courseContent?.forEach((section, index) => {
        section.subSection?.forEach((subsection, subindex) => {
          if (subsection._id === lastCompletedLecture) {
            setOpenIndex(index);
            setLecture(subsection);
          }
        });
      });
    } else {
      setOpenIndex(0);
      setLecture(courseDetails.courseContent[0]?.subSection[0]);
    }
  }, [user, courseDetails, user.courseProgress.length]);

  return (
    <>
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
              onClick={() => setopenReviewModal(true)}
            />
          </div>
          <h2 className="text-richblack-5 text-lg font-semibold">
            {courseDetails?.courseName}
          </h2>
          <div>
            {totalCompletedLecturesArray?.length}/
            {courseDetails.courseContent?.reduce(
              (acc, curr) => acc + curr.subSection.length,
              0
            )}{" "}
            Lectures Completed
          </div>
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
                          onChange={(e) => {
                            toggleMarkUnmark(subItem._id);
                          }}
                          checked={
                            user?.courseProgress?.includes(subItem._id)
                              ? true
                              : false
                          }
                          className="w-4 h-4 rounded border-richblack-300 bg-richblack-700 text-yellow-25 focus:ring-yellow-25 focus:ring-offset-richblack-700 cursor-pointer"
                        />
                        <p>{subItem.title}</p>
                        <MdOndemandVideo className="text-richblack-300" />
                      </div>
                      <div>
                        {convertTime(subItem?.SubSectionVideo?.duration)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      {openReviewModal && (
        <AddReviewModal
          setopenReviewModal={setopenReviewModal}
          courseId={courseDetails?._id}
        />
      )}
    </>
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
