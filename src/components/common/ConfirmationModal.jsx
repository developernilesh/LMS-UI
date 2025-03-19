import React from "react";
import SubmitButton from "../Form/SubmitButton";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div
      className="fixed inset-0 bg-richblack-700/50 flex justify-center items-center backdrop-blur-md z-50"
      onClick={modalData.btn2handler}
    >
      <div
        className="p-8 rounded-xl bg-richblack-900 min-w-[400px] shadow-lg border border-richblack-700 transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-pink-400 mb-2">
            {modalData.text1}
          </h3>
          <p className="text-richblack-100">{modalData.text2}</p>
        </div>
        <div className="flex gap-4 justify-end mt-8">
          <button
            onClick={modalData.btn2handler}
            className="bg-transparent hover:bg-richblack-800 rounded-lg font-medium text-richblack-300 px-5 py-2.5 border border-richblack-600 transition-all duration-200 hover:text-white"
          >
            {modalData.btn2text}
          </button>
          <SubmitButton
            buttonContent={modalData.btn1text}
            onClick={modalData.btn1handler}
            buttonType="button"
            width="w-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
