import React, { useEffect, useState } from "react";

const TagsInputField = ({
  tagsList,
  setTagsList,
  emptyTagsArrayError,
  setEmptyTagsArrayError,
}) => {
  const [tag, setTag] = useState("");
  const [emptyTagError, setEmptyTagError] = useState(false);

  useEffect(() => {
    console.log("list", tagsList);
  }, [tagsList.length]);

  const addTagToTaglist = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tag) {
        tagsList.push(tag);
        setTag("");
      } else {
        setEmptyTagError(true);
      }
    }
  };

  return (
    <label className="relative w-full text-richblack-5">
      <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
        Tags<sup className="text-pink-200">*</sup>
      </p>
      <input
        type="text"
        placeholder="Please press 'Enter' after adding each tag!"
        value={tag}
        onChange={(e) => {
          setTag(e.target.value);
          setEmptyTagError(false);
          setEmptyTagsArrayError(false);
        }}
        onKeyDown={(e) => {
          addTagToTaglist(e);
          setEmptyTagsArrayError(false);
        }}
        className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
      />
      {emptyTagsArrayError && (
        <p className="text-pink-200 text-sm mt-1">
          Minimum one tag is required
        </p>
      )}
      {!emptyTagsArrayError && emptyTagError && (
        <p className="text-pink-200 text-sm mt-1">
          Please enter a tag to add tag
        </p>
      )}
    </label>
  );
};

export default TagsInputField;
