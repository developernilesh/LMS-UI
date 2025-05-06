import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";

const { VIEW_CATEGORY_PAGE_DETAILS_API } = endpoints;

const Catalog = () => {
  const { categories } = useSelector((state) => state.course);
  const param = useParams();
  const dispatch = useDispatch();

  const [categoryInfo, setCategoryInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("Most Popular");
  const [categoryPageDetails, setCategoryPageDetails] =
    useState("Most Popular");

  useEffect(() => {
    categories.length > 0 &&
      setCategoryInfo(categories?.find((cat) => cat._id === param.categoryId));
  }, [categories, param]);

  const fetchCategoryPageDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        VIEW_CATEGORY_PAGE_DETAILS_API + `/${param.categoryId}`
      );
      if (response?.data?.success) {
        setCategoryPageDetails(response.data.data);
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCategoryPageDetails();
  }, []);

  return (
    <>
      <div className="bg-richblack-800 w-full py-8">
        <div className="w-11/12 mx-auto">
          <h2 className="text-3xl font-semibold text-richblack-5">
            {categoryInfo?.name}
          </h2>
          <div className="text-richblack-200 mt-3">
            {categoryInfo?.description}
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto my-8">
        <h3 className="text-2xl font-semibold text-richblack-50">
          Courses to get you started
        </h3>
        <div>
          {/* Tabs for course filtering */}
          <div className="flex flex-wrap gap-4 mt-4 mb-6 border-b border-richblack-600">
            {["Most Popular", "New", "Trending"].map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-lg font-medium ${
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
          <div className="flex items-center justify-center text-richblack-5 text-xl">
            {activeTab}
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
