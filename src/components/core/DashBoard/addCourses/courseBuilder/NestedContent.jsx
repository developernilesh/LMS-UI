import React, { useRef, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaCaretDown, FaRegPlusSquare } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineSlowMotionVideo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { setLoading } from "../../../../../redux/slices/loaderSlice";
import apiConnector from "../../../../../services/apiConnector";
import endpoints from "../../../../../services/apiEndpoints";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";
import SubmitButton from "../../../../Form/SubmitButton";
import SubSectionModal from "./SubSectionModal";

const { DELETE_SECTION_API, DELETE_SUB_SECTION_API } = endpoints;

const NestedContent = ({ editSection, fetchSpecificCourse }) => {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [confirmationModalData, setConfirmationModalData] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);

  const deleteSectionHandler = async (sectionId) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", DELETE_SECTION_API, {
        sectionId,
      });
      if (response?.data?.success) {
        fetchSpecificCourse(course?._id);
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteSubSectionHandler = async (subSectionId) => {
    console.log(subSectionId);
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", DELETE_SUB_SECTION_API, {
        subSectionId,
      });
      if (response?.data?.success) {
        fetchSpecificCourse(course?._id);
      }
    } catch (error) {
      toast.error(error?.message || error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="bg-richblack-700 px-6 pb-2 rounded-lg border border-richblack-500 text-richblack-200">
        {course?.courseContent?.map((item) => (
          <details className="group" key={item._id}>
            <summary className="list-none cursor-pointer">
              <div className="flex justify-between items-center py-3 border-b border-richblack-500">
                <div className="flex gap-1 items-center">
                  <AiOutlineMenuUnfold />
                  <span>{item.sectionName}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1 items-center border-r border-richblack-300 pr-2">
                    <MdEdit
                      onClick={(e) => {
                        e.preventDefault();
                        editSection(item);
                      }}
                    />
                    <MdDelete
                      onClick={(e) => {
                        e.preventDefault();
                        setConfirmationModalData({
                          text1: "Are you sure?",
                          text2: "This section may contain video contents!",
                          btn1text: "Delete",
                          btn2text: "Cancel",
                          btn1handler: () => {
                            deleteSectionHandler(item._id);
                            setConfirmationModalData(null);
                          },
                          btn2handler: () => setConfirmationModalData(null),
                        });
                      }}
                    />
                  </div>
                  <FaCaretDown className="group-open:rotate-180 transition-transform cursor-pointer duration-300 ease-linear" />
                </div>
              </div>
            </summary>
            <div>
              {item?.subSection?.map((subItem, idx) => (
                <div
                  className="flex justify-between items-center py-3 border-b border-richblack-500 pl-5 cursor-pointer"
                  key={idx}
                >
                  <div
                    className="flex gap-1 items-center w-full"
                    onClick={() => setViewSubSection(subItem)}
                  >
                    <MdOutlineSlowMotionVideo />
                    <span>{subItem.title}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <MdEdit onClick={() => setEditSubSection(subItem)} />
                    <MdDelete
                      onClick={() => {
                        setConfirmationModalData({
                          text1: "Are you sure?",
                          text2: "This lecture will be no more available!",
                          btn1text: "Delete",
                          btn2text: "Cancel",
                          btn1handler: () => {
                            deleteSubSectionHandler(subItem._id);
                            setConfirmationModalData(null);
                          },
                          btn2handler: () => setConfirmationModalData(null),
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
              <SubmitButton
                buttonContent=<div className="flex gap-1 items-center">
                  <FaRegPlusSquare /> <span>Add Lecture</span>
                </div>
                width="w-fit"
                onClick={() => setAddSubSection(item._id)}
                background="bg-richblack-700 my-2"
                text="text-yellow-100"
              />
            </div>
          </details>
        ))}
      </div>
      {confirmationModalData && (
        <ConfirmationModal modalData={confirmationModalData} />
      )}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
          fetchCourseData={() => fetchSpecificCourse(course?._id)}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
          fetchCourseData={() => fetchSpecificCourse(course?._id)}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
    </>
  );
};

export default NestedContent;
