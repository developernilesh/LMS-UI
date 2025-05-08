import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/slices/loaderSlice";
import apiConnector from "../services/apiConnector";
import endpoints from "../services/apiEndpoints";
import Loader from "../components/Loader/Loader";
import Footer from "../components/common/Footer";
import StarRatings from "react-star-ratings";

const { VIEW_CATEGORY_PAGE_DETAILS_API } = endpoints;

function formatNumberWithCommas(number) {
  // Ensure the number is treated as a number type
  number = Number(number);

  // Check if the number is valid
  if (isNaN(number)) return;

  // Format the number with commas and two decimal places
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const Catalog = () => {
  const { loading } = useSelector((state) => state.loader);
  const param = useParams();
  const dispatch = useDispatch();

  const [categoryInfo, setCategoryInfo] = useState(null);
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
        setCategoryInfo(response.data.data.categoryDetails);
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
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
          <div className="flex flex-wrap items-center justify-between text-richblack-5 min-h-[calc(100vh/2)]">
            {categoryInfo?.courses?.map((item) => (
              <div
                className="flex flex-col w-[360px] bg-richblack-800 rounded-b-lg"
                key={item._id}
              >
                <img
                  src={item.thumbNail.secure_url}
                  alt={item.courseName}
                  className="w-full h-[203px] rounded-t-lg"
                />
                <div className="p-4 flex flex-col gap-2">
                  <div>
                    <p className="text-richblack-5 font-medium">
                      {item.courseName}
                    </p>
                    <p className="text-richblack-200 text-sm truncate">
                      {item.courseDescription}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-yellow-100">3.4</div>
                    <StarRatings
                      rating={3.4}
                      starDimension="16px"
                      starSpacing="2px"
                      starRatedColor="#E7C009"
                      starEmptyColor="#424854"
                      // changeRating={changeRating}
                      numberOfStars={5}
                      name="rating"
                    />
                    <div className="text-richblack-300">(Review Count)</div>
                  </div>
                  <div className="text-lg font-medium text-richblack-5">
                    Rs. {formatNumberWithCommas(item.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
    </>
  );
};

export default Catalog;
