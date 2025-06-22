import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";
import Loader from "../components/Loader/Loader";
import Footer from "../components/common/Footer";
import CategoryCourseCard from "../components/core/catalogPage/CategoryCourseCard";
import FrequentlyBoughtCourseCard from "../components/core/catalogPage/FrequentlyBoughtCourseCard";
import CourseSlider from "../components/core/catalogPage/CourseSlider";
import { handleError } from "../services/operations/handleError";

const { VIEW_CATEGORY_PAGE_DETAILS_API } = endpoints;

const Catalog = () => {
  const { loading } = useSelector((state) => state.loader);
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Most Popular");
  const [categoryPageDetails, setCategoryPageDetails] =
    useState("Most Popular");

  const fetchCategoryPageDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        VIEW_CATEGORY_PAGE_DETAILS_API + `/${param.categoryId}`
      );
      if (response?.data?.success) {
        setCategoryPageDetails(response.data.data);
        setActiveTab("Most Popular");
      }
    } catch (error) {
      dispatch(handleError(navigate, error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCategoryPageDetails();
  }, [param.categoryId]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="bg-richblack-800 w-full py-8">
        <div className="container mx-auto">
          <div className="w-11/12 mx-auto">
            <h2 className="text-3xl font-semibold text-richblack-5">
              {categoryPageDetails?.categoryDetails?.name}
            </h2>
            <div className="text-richblack-200 mt-3">
              {categoryPageDetails?.categoryDetails?.description}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="w-11/12 mx-auto my-8">
          <h3 className="text-2xl font-semibold text-richblack-50">
            Courses to get you started
          </h3>
          <div>
            {/* Tabs for course filtering */}
            <div className="flex flex-wrap gap-4 mt-4 mb-6 border-b border-richblack-600">
              {["Most Popular", "Newest", "All"].map((tab, index) => (
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
              (categoryPageDetails?.mostPopular?.courses.length > 0 ? (
                <CourseSlider
                  courses={categoryPageDetails?.mostPopular?.courses}
                />
              ) : (
                <div className="w-full text-pink-400 text-center mb-2">
                  No Course Found.
                </div>
              ))}
            {activeTab === "Newest" &&
              (categoryPageDetails?.newestCourses?.courses.length > 0 ? (
                <CourseSlider
                  courses={categoryPageDetails?.mostPopular?.courses}
                />
              ) : (
                <div className="w-full text-pink-400 text-center mb-2">
                  No Course Found.
                </div>
              ))}
            {activeTab === "All" &&
              (categoryPageDetails?.categoryDetails?.courses.length > 0 ? (
                <CourseSlider
                  courses={categoryPageDetails?.categoryDetails?.courses}
                />
              ) : (
                <div className="w-full text-pink-400 text-center mb-2">
                  No Course Found.
                </div>
              ))}
            {/* </div> */}
          </div>
        </div>
        {categoryPageDetails?.differentCategories?.length > 0 && (
          <div className="w-11/12 mx-auto my-8">
            <h3 className="text-2xl font-semibold text-richblack-50 mb-6">
              Most Popular Courses in Other Categories
            </h3>
            <CourseSlider courses={categoryPageDetails?.differentCategories} />
          </div>
        )}
        {categoryPageDetails?.topSellingCourses?.length > 0 && (
          <div className="w-11/12 mx-auto my-8">
            <h3 className="text-2xl font-semibold text-richblack-50 mb-6">
              Frequently Bought Courses
            </h3>
            {/* Courses in Other Categories */}
            <div className="flex flex-wrap md:justify-center items-center gap-6 text-richblack-5]">
              {categoryPageDetails?.topSellingCourses
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

export default Catalog;
