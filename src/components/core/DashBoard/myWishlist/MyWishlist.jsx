import React from "react";

const MyWishlist = () => {
  return (
    <div className="w-11/12">
      <p className="py-3 text-richblack-100">2 Courses in Wishlist</p>
      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="w-full max-w-[780px] border-t border-richblack-700">
          Cart Items
        </div>
        <div className="border-t border-richblack-700">
          <div className="w-full sm:w-[282px] mx-0 my-6 sm:mx-6 bg-richblack-800 rounded-lg p-6">
            <div className="flex flex-row sm:flex-col gap-1">
              <div className="text-richblack-100 text-sm">Total</div>
              <div className="text-2xl font-semibold text-yellow-100">Rs. 2500</div>
              <div className="text-sm text-richblack-200 line-through">Rs. 3500</div>
            </div>
            <SubmitButton
              buttonContent="Buy Now"
              // onClick={() => navigate("/dashboard/settings")}
              buttonType="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
