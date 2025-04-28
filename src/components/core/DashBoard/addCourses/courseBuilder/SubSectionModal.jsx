import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div
      className="fixed inset-0 bg-richblack-700/50 flex justify-center items-center backdrop-blur-md z-50"
      onClick={() => setModalData(null)}
    >
      <div
        className="w-full max-w-[665px] border border-richblack-600 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 flex justify-between items-center bg-richblack-700 rounded-t-lg border-b border-richblack-600">
          <span>{add ? "Add" : edit ? "Edit" : view ? "View" : ""}</span>
          <IoClose />
        </div>
        <div className="bg-richblack-800 px-6 py-4 rounded-b-lg">
          <form
            onSubmit={handleSubmit(submitAddCourseForm)}
            className="w-full flex flex-col gap-5 rounded-md bg-richblack-800 p-6"
          ></form>
        </div>
      </div>
    </div>
  );
};

export default SubSectionModal;
