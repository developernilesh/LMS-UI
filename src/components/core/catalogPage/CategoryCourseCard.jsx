import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

function formatNumberWithCommas(number) {
  number = Number(number);
  if (isNaN(number)) return;
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const CategoryCourseCard = ({ data }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    data.ratingAndReview?.length >= 1 &&
      setAvgRating(
        data.ratingAndReview?.reduce((acc, curr) => acc + curr.rating, 0) /
          data.ratingAndReview?.length
      );
  }, []);

  return (
    <div className="flex flex-col w-[360px] rounded-b-lg my-2 bg-richblack-800 hover:cursor-pointer hover:scale-[1.01] transtion-all duration-200 ease-in-out">
      <img
        src={data.thumbNail.secure_url}
        alt={data.courseName}
        className="w-full h-[203px] rounded-t-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2 min-h-[81px]">
          <p className="text-richblack-5 font-medium line-clamp-2 overflow-hidden">
            {data.courseName}
          </p>
          <p className="text-richblack-200 truncate italic">
            {`${data.instructor.firstName} ${data.instructor.lastName}`}
          </p>
        </div>
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
            ({data.ratingAndReview?.length}{" "}
            {data.ratingAndReview?.length > 1 ? "reviews" : "review"})
          </div>
        </div>
        <div className="text-lg font-medium text-richblack-5">
          Rs. {formatNumberWithCommas(data.price)}
        </div>
      </div>
    </div>
  );
};

export default CategoryCourseCard;
