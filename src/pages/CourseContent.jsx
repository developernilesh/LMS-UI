import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentSidebar from "../components/core/courseContent/ContentSidebar";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";
import toast from "react-hot-toast";
import Error from "./Error";
import Loader from "../components/Loader/Loader";

const { GET_SPECIFIC_COURSE_API } = endpoints;

const CourseContent = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [courseDetails, setCourseDetails] = useState(null);
  const [lecture, setLecture] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.loader);

  const fetchSpecificCourseDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_SPECIFIC_COURSE_API + `/${param.courseId}`
      );
      if (response?.data?.success) {
        setCourseDetails(response.data.data);
        setLecture(response.data.data?.courseContent[0]?.subSection[0]);
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

  if (!user || loading) return <Loader />;

  return user?.accountType === "Student" &&
    user?.courses?.includes(courseDetails?._id) ? (
    <div className="w-full flex flex-col-reverse md:flex-row">
      <ContentSidebar courseDetails={courseDetails} setLecture={setLecture} lecture={lecture} />
      <div className="w-full">
        <div className="w-11/12 mx-auto flex flex-col gap-3">
          <video
            src={lecture?.SubSectionVideo?.secure_url}
            controls={true}
            // autoPlay={true}
            className="w-full"
          />
          <div className="pt-3 pb-6 w-full border-t border-richblack-600">
            <h3 className="text-lg font-medium text-richblack-25">{lecture?.title}</h3>
            <p className="text-sm text-richblack-200">{lecture?.description}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Error />
  );
};

export default CourseContent;
