import React from "react";

const MyWishlist = () => {
  return (
    <div className="w-11/12">
      <p className="py-3 text-richblack-100">
        2 Courses in Wishlist
      </p>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full max-w-[780px] border-t border-richblack-700">Cart Items</div>
        <div className="border-t border-richblack-700">
          <div className="w-full sm:w-[282px] mx-0 my-6 sm:mx-6 bg-richblack-800 rounded-lg">
            abcd
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
