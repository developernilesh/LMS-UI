import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentSidebar from "../components/core/courseContent/ContentSidebar";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";
import toast from "react-hot-toast";

const { GET_SPECIFIC_COURSE_API } = endpoints;

const CourseContent = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [courseDetails, setCourseDetails] = useState(null);
  const [videoSource, setVideoSource] = useState(null);

  const fetchSpecificCourseDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_SPECIFIC_COURSE_API + `/${param.courseId}`
      );
      if (response?.data?.success) {
        setCourseDetails(response.data.data);
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSpecificCourseDetails();
  }, []);

  return (
    <div className="w-full flex flex-col-reverse md:flex-row">
      <ContentSidebar
        courseDetails={courseDetails}
        setVideoSource={setVideoSource}
      />
      <div className="w-full py-6">
        <div className="w-11/12 mx-auto">
          <video
            src={videoSource}
            controls={true}
            // autoPlay={view ? false : true}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
