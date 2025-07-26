import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";
import Loader from "../components/Loader/Loader";
import Footer from "../components/common/Footer";
import FrequentlyBoughtCourseCard from "../components/core/catalogPage/FrequentlyBoughtCourseCard";
import CourseSlider from "../components/core/catalogPage/CourseSlider";
import { handleError } from "../services/operations/handleError";

const { VIEW_ALL_COURSES_API } = endpoints;

const AllCourses = () => {
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Most Popular");
  const [allCourseDetails, setAllCourseDetails] = useState([]);

  const fetchAllCourses = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", VIEW_ALL_COURSES_API);
      if (response?.data?.success) {
        setAllCourseDetails(response.data.data);
      }
    } catch (error) {
      dispatch(handleError(navigate, error, false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="container mx-auto">
        <div className="w-11/12 mx-auto py-8">
          <h3 className="text-2xl font-semibold text-richblack-50">
            Courses to get you started
          </h3>
          <div>
            {/* Tabs for course filtering */}
            <div className="flex flex-wrap gap-4 mt-4 mb-6 border-b border-richblack-600">
              {["Most Popular", "Newest"].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 font-medium ${
                    activeTab === tab
                      ? "text-yellow-50 border-b-2 border-yellow-50"
                      : "text-richblack-50"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {/* <div className="flex flex-wrap items-center gap-6 text-richblack-5"> */}
            {activeTab === "Most Popular" &&
              (allCourseDetails?.mostPopularCourses?.length > 0 ? (
                <CourseSlider courses={allCourseDetails?.mostPopularCourses} />
              ) : (
                <div className="w-full text-pink-400 text-center mb-2">
                  No Course Found.
                </div>
              ))}
            {activeTab === "Newest" &&
              (allCourseDetails?.newestCourses?.length > 0 ? (
                <CourseSlider courses={allCourseDetails?.newestCourses} />
              ) : (
                <div className="w-full text-pink-400 text-center mb-2">
                  No Course Found.
                </div>
              ))}
            {/* </div> */}
          </div>
        </div>
        {allCourseDetails?.frequentlyBoughtCourses?.length > 0 && (
          <div className="w-11/12 mx-auto my-8">
            <h3 className="text-2xl font-semibold text-richblack-50 mb-6">
              Frequently Bought Courses
            </h3>
            {/* Courses in Other Categories */}
            <div className="flex flex-wrap md:justify-center items-center gap-6 text-richblack-5]">
              {allCourseDetails?.frequentlyBoughtCourses
                ?.filter((course) => course.status === "Published")
                ?.map((item) => (
                  <FrequentlyBoughtCourseCard data={item} key={item._id} />
                ))}
            </div>
          </div>
        )}
      </div>
      {/* topSellingCourses */}
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
    </>
  );
};

export default AllCourses;
